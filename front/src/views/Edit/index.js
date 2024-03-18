import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  Panel,
  getRectOfNodes,
  getTransformForBounds,
  MarkerType,
} from 'reactflow';
import '../index.css';
import 'reactflow/dist/style.css';
import { v4 as uid } from "uuid";
import CustomNode from '../../ui-component/custom/CustomNode';
import DefaultNode from "../../ui-component/custom/DefaultNode";
import InputNode from "../../ui-component/custom/InputNode";
import OutputNode from "../../ui-component/custom/OutputNode";
import CircularNode from "../../ui-component/custom/CircularNode";
import DiagonalNode from "../../ui-component/custom/DiagonalNode ";
import useStore from '../../Zustand/store';
import { shallow } from "zustand/shallow";
import { toPng } from "html-to-image";
import { Button } from '@mui/material';
import AddLibrary from '../../ui-component/Modal/AddLibrary';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import DsTable from '../../ui-component/Table/DSTable';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  dragAdd: state.dragAdd,
  dragAddNode: state.dragAddNode,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  modal: state.modal,
  getModalById:state.getModalById,
  updateModal:state.updateModal,
});

//Edge line styling
const connectionLineStyle = { stroke: "black" };
const edgeOptions = {
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "black",
  },
  // markerStart: {
  //   type: MarkerType.ArrowClosed,
  //   width: 20,
  //   height: 20,
  //   color: "#FF0072",
  // },
  animated: false,
  style: {
    stroke: "aqua",
  },
};

const nodetypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
  receiver: CustomNode,
  signal: CustomNode,
  transmitter: CircularNode,
  transceiver: DiagonalNode,
};
const flowKey = "example-flow";

export default function Edit() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    dragAdd,
    dragAddNode,
    setNodes,
    setEdges,
    getModalById,
    modal,
    updateModal,
  } = useStore(selector, shallow);
  const { id } = useParams();
  // const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [savedTemplate, setSavedTemplate] = useState({});
  const { isTableOpen } = useSelector(state =>state?.currentId);
  console.log('isTableOpen', isTableOpen)
  console.log('id edit', id)
  
  useEffect(()=>{
    getModalById(id);
  },[id ]);
  
  useEffect(()=>{
    const template = modal?.template;
    setSavedTemplate(template);
    onSaveInitial(template); 
    onRestore();
  },[modal])
  console.log("savedTemplate", savedTemplate);
  //for downloading the circuit and image
  function downloadImage(dataUrl) {
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }

  const imageWidth = 1024;
  const imageHeight = 768;

  const handleDownload = () => {
    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  // useEffect(() => {
  //   setNodes([]);
  //   setEdges([]);
  // }, []);

  //fn for Drag and drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.dataTransfer.getData("application/parseFile");
      const template = event.dataTransfer.getData("application/template");
      let parsedNode;
      let parsedTemplate;
      if (file) {
        parsedNode = JSON.parse(file);
      } else {
        parsedTemplate = JSON.parse(template);
      }

      // if (typeof parsedNode === "undefined" || !parsedNode || typeof parsedTemplate === "undefined" || !parsedTemplate) {
      //   return;
      // }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      if (parsedNode) {
        const newNode = {
          id: uid(),
          type: parsedNode.type,
          position,
          properties: parsedNode.properties,
          data: {
            label: parsedNode.data["label"],
            bgColor: parsedNode.data["bgColor"],
          },
        };
        dragAdd(newNode);
      }

      if (parsedTemplate) {
        let newNodes = [];
        let newEdges = [];
        const randomId = Math.floor(Math.random() * 1000);
        const randomPos = Math.floor(Math.random() * 500);

        parsedTemplate["nodes"].map((node) => {
          newNodes.push({
            id: `${node.id + randomId}`,
            data: node.data,
            type: node.type,
            position: {
              x: node["position"]["x"] + randomPos,
              y: node["position"]["y"] + randomPos,
            },
            properties: node.properties,
          });
        });

        parsedTemplate["edges"].map((edge) =>
          newEdges.push({
            id: uid(),
            source: `${edge.source + randomId}`,
            target: `${edge.target + randomId}`,
            ...edgeOptions,
          })
        );

        dragAddNode(newNodes, newEdges);
      }
    },
    [reactFlowInstance]
  );

  // console.log("nodes",nodes);
  // console.log('edges', edges);
  //fn for save & restore
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onSaveInitial = useCallback((template) => {
    localStorage.removeItem(flowKey)
    if (template) {
      localStorage.setItem(flowKey, JSON.stringify(template));
    }
  }, []);
  // const onRestoreInitial = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey));
  //     if (flow) {
  //       setSavedTemplate(flow);
  //       // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //     }
  //     else{
  //       setNodes([])
  //       setEdges([])
  //     }
  //   };
  //   restoreFlow();
  // }, []);


  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        setSavedTemplate(flow);
        // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }else{
        setNodes([])
        setEdges([])
      }
    };
    restoreFlow();
  }, [reactFlowInstance]);

  const handleSave = () => {
    setOpenTemplate(true);
    onSave();
    onRestore();
  };

  const handleSaveToModal = () => {
    let mod = {...modal};
    console.log('mod', mod)
      let Details = nodes?.map(node=>({
          name:node?.data?.label,
          props:node?.properties,
      }));
      console.log('Details', Details);
//       let md = newMod?.scenarios?.map(item=>item.Details=Details);
//   console.log('Details', Details)
// console.log('md', md);
// updateModal(newMod);
    // mod.damage_scenarios=[];
    mod.template = {nodes,edges}
    // console.log('nodes', nodes);
    // console.log('edges', edges)
    mod.scenarios = [
      {
        id:uid(),
          name: 'Item Modal & Assets',  
          Details:Details
      },
      {
        id:uid(),
          name: 'Damage Scenarios Identification and Impact Ratings',
          subs:[
              {
                 name: 'Damage Scenarios Derivations',
                 Details:Details
              },
              {
                  name: 'Damage Scenarios - Impact Ratings',
                  scenes:[]
               }
          ] 
      },
      {
        id:uid(),
          name: 'Threat Scenarios',
          Details:Details

      },
  ]

  console.log('mod', mod)
    updateModal(mod)
  }

  const handleClose = () => {
    setOpenTemplate(false);
  };

  return (
    <>
    {!isTableOpen ? <div style={{ width: '100%', height: '90%',border:'1px solid',marginTop:'1.2rem',background:'white' }}>
        <ReactFlowProvider>
        {/* <div className="reactflow-wrapper" ref={reactFlowWrapper}> */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodetypes}
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={edgeOptions}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            // style={{
            //   " .react-flow__node": {
            //     backgroundColor: "black",
            //   },
            // }}
          >
            <Panel
              position="top-left"
              style={{
                display: "flex",
                gap: 5,
                background: "white",
                marginLeft: "2rem",
                marginTop: "2rem",
              }}
            >
              <Button variant="outlined" onClick={onSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={onRestore}>
                Restore
              </Button>
              <Button variant="outlined" onClick={handleSave}>
                Add12
              </Button>
              <Button variant="outlined" onClick={handleSaveToModal}>
                Add to Modal
              </Button>
              <Button
                variant="outlined"
                className="download-btn"
                onClick={handleDownload}
              >
                Download Image
              </Button>
            </Panel>
            <Controls />
            <MiniMap zoomable pannable />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        {/* </div> */}
      </ReactFlowProvider>
      <AddLibrary
        open={openTemplate}
        handleClose={handleClose}
        savedTemplate={savedTemplate}
        setNodes={setNodes}
        setEdges={setEdges}
      />
    </div>:<DsTable/>}
    </>
  );
}