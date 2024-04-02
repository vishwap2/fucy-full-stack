import React, { 
  // useState,
  //  useCallback, 
   useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  // MarkerType,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import '../index.css';
import 'reactflow/dist/style.css';
// import { v4 as uid } from "uuid";
import CustomNode from '../../ui-component/custom/CustomNode';
import DefaultNode from "../../ui-component/custom/DefaultNode";
import InputNode from "../../ui-component/custom/InputNode";
import OutputNode from "../../ui-component/custom/OutputNode";
import CircularNode from "../../ui-component/custom/CircularNode";
import DiagonalNode from "../../ui-component/custom/DiagonalNode ";
import AttackTreeNode from '../../ui-component/CustomGates/AttackTreeNode';
import useStore from '../../Zustand/store';
import { shallow } from "zustand/shallow";
// import { useSelector } from 'react-redux';
import ORGate from '../../ui-component/CustomGates/ORGate';
import ANDGate from '../../ui-component/CustomGates/ANDGate';
import TransferGate from '../../ui-component/CustomGates/TransferGate';
import VotingGate from '../../ui-component/CustomGates/VotingGate';
import { Button } from '@mui/material';
import { useParams } from 'react-router';
import { v4 as uid } from 'uuid';
import Event from '../../ui-component/CustomGates/Event';
import { useDispatch } from 'react-redux';
import { setAttackScene } from '../../store/slices/CurrentIdSlice';


const selector = (state) => ({
  nodes:state.attackNodes,
  edges:state.attackEdges,
  onNodesChange: state.onAttackNodesChange,
  onEdgesChange: state.onAttackEdgesChange,
  onConnect: state.onAttackConnect,
  dragAdd: state.dragAdd,
  addAttackNode: state.addAttackNode,
  dragAddNode: state.dragAddNode,
  setNodes:state.setAttackNodes,
  setEdges: state.setAttackEdges,
  modal: state.modal,
  getModalById:state.getModalById,
  update:state.updateModal,
});

//Edge line styling
const connectionLineStyle = { stroke: "black" };
const edgeOptions = {
  type: "step",
  // markerEnd: {
  //   type: MarkerType.ArrowClosed,
  //   width: 20,
  //   height: 20,
  //   color: "black",
  // },
  // markerStart: {
  //   type: MarkerType.ArrowClosed,
  //   width: 20,
  //   height: 20,
  //   color: "#FF0072",
  // },
  animated: false,
  style: {
    stroke: "gray",
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
  attack_tree_node:AttackTreeNode,
  Event:Event,
  [`OR Gate`]:ORGate,
  [`AND Gate`]:ANDGate,
  [`Transfer Gate`]:TransferGate,
  [`Voting Gate`]:VotingGate,
};
// const flowKey = "example-flow";

export default function Home({attackScene}) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    // dragAdd,
    // dragAddNode,
    addAttackNode,
    setNodes,
    setEdges,
    getModalById,
    modal,
    update
  } = useStore(selector, shallow);
  const dispatch = useDispatch();
  const { id } = useParams();
  // const reactFlowWrapper = useRef(null);
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [savedTemplate, setSavedTemplate] = useState({});
  // const currentId = useSelector(state=>state?.currentId?.currentId);
  console.log('attackScene', attackScene);
console.log('modal', modal)

  useEffect(()=>{
    setNodes([]);
    setEdges([]);
    getModalById(id);
    if(attackScene?.template){
      setNodes(attackScene?.template?.nodes);
      setEdges(attackScene?.template?.edges);

    }
    else{
      const newNode = {
        id: attackScene?.id,
        type:'attack_tree_node' ,
        position:{
          x:100,y:100
        },
        data: {
          label: attackScene?.name,
        },
      };
      setTimeout(() => {
        addAttackNode(newNode);
      }, 500);
    }
  },[attackScene])

  
  console.log("nodes",nodes);
  
  const handleSave = () => {
    console.log('nodes', nodes);
    console.log('edges', edges);
    const atScene = { ...attackScene };
    const mod = {...modal};
    const selected = mod?.scenarios[3]?.subs[0]?.scenes?.find(ite=>ite.id===atScene?.id);
    selected.template = {
      id:uid(),
      nodes:nodes,
      edges:edges,
    }
    dispatch(setAttackScene(selected));
    console.log('mod', mod)
    update(mod);
  }

  return (
    <div style={{ height: '70svh',background:'white' }}>
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
            // onInit={setReactFlowInstance}
            // onDrop={onDrop}
            // onDragOver={onDragOver}
            fitView
          >
          <Panel
              position="top-left"
              style={{
                display: "flex",
                gap: 5,
                background: "white",
                // marginLeft: "2rem",
                // marginTop: "2rem",
              }}
            >
              <Button variant="outlined" onClick={handleSave}>
                Add
              </Button>
            </Panel>
           <MiniMap/>
            <Controls />
          </ReactFlow>
        {/* </div> */}
      </ReactFlowProvider>
    </div>
  );
}