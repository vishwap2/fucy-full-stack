
import {createWithEqualityFn} from "zustand/traditional"
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import axios from "axios";
import { configuration } from "../services/baseApiService";

const useStore = createWithEqualityFn((set, get) => ({
  attackNodes:[],
  attackEdges:[],
  nodes:[],
  edges: [],
  sidebarNodes:[],
  template:[],
  selectedTemplate:{},
  Modals:[],
  modal:{},
  DamageScenaris:[],
  scenerio:{},
  component:[],
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onAttackNodesChange: (changes) => {
    set({
      attackNodes: applyNodeChanges(changes, get().attackNodes),
    });
  },
  onAttckEdgesChange: (changes) => {
    set({
      attackEdges: applyEdgeChanges(changes, get().attackEdges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onAttackConnect: (connection) => {
    set({
      attackEdges: addEdge(connection, get().attackEdges),
    });
  },
  fetchAPI: async () => {
    const res = await axios.get(`${configuration.apiBaseUrl}template`);
    set({
      template:res.data
    })
  },

  setNodes:(newNodes)=>{
   set({
    nodes:newNodes
   })
  },
  setEdges:(newEdges)=>{
set({
  edges:newEdges
})
  },


  setAttackNodes:(newNodes)=>{
    set({
     attackNodes:newNodes
    })
   },

   setAttackEdges:(newEdges)=>{
 set({
  attackEdges:newEdges
 })
   },

  getSidebarNode:async()=>{
    const res = await axios.get(`${configuration.apiBaseUrl}sidebarNode`);
    set({
     sidebarNodes:res.data,
    })
  },

  // createComponent

  getTemplate:async(id)=>{
    const res = await axios.get(`${configuration.apiBaseUrl}template?id=${id}`);
    set({
      selectedTemplate:res.data[0],
      nodes:res['data'][0]['template']['nodes'],
      edges:res['data'][0]['template']['edges']
    })
  } ,

  getModals:async()=>{
    const res = await axios.get(`${configuration.apiBaseUrl}Modals`);
    set({
   Modals:res.data
    })
  } ,

  getModalById:async(id)=>{
    const res = await axios.get(`${configuration.apiBaseUrl}Modals/${id}`);
    console.log('res.data ...', res.data)
    set({
   modal:res.data
    })
  },
  getDamageScenarios:async()=>{
    const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios`);
    set({
      DamageScenaris:res.data
    })
  },
  getUniqueDamageScenario:async(id)=>{
    const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios/${id}`);
    set({
   scenerio:res.data
    })
  },

  updateTemplate:async(newTemplate)=>{
    const res = await axios.patch(`${configuration.apiBaseUrl}template/${newTemplate.id}`,newTemplate);
    console.log('res', res)
  },

  updateModal:async(newModal)=>{
    console.log('newModal', newModal);
    const res = await axios.patch(`${configuration.apiBaseUrl}Modals/${newModal?.id}`,newModal);
    console.log('res', res);
    if(res) {
      alert('Updated')
      window.location.reload();
      return res;
    }
  } ,


   createComponent:async(newTemplate)=>{
    // const res = await axios.post(`${configuration.backendUrl}createComponent`,newTemplate)
    const res = await axios.post(`${configuration.backendUrl}createComponent`,newTemplate) 
    console.log('res', res)

   },


   getComponent:async()=>{
    const res = await axios.get(`${configuration.backendUrl}getComponent`);
    console.log('res', res);
    // set({
    //   component:res.data,
    // })
  },
  addTemplate:async(newTemplate)=>{
    try{
      const res = await axios.post(`${configuration.apiBaseUrl}template`,newTemplate)
      // console.log('res store', res)
      if(res){
        setTimeout(() => {
          alert("Added Succesfully")
          window.location.reload();
      }, 500);  
      }
    }catch(err){
      // console.log('err', err)
      setTimeout(() => {
        alert("Something went Wrong")
    }, 1000);  
    }
  },

  addDamageScenario:async(newTemplate)=>{
    console.log('newTemplate', newTemplate)
    try{
      const res = await axios.post(`${configuration.apiBaseUrl}Damage-scenarios`,newTemplate)
      // console.log('res store', res)
      if(res){
        setTimeout(() => {
          // alert("Added Succesfully")
          // window.location.reload();
      }, 500);  
      }
    }catch(err){
      // console.log('err', err)
      setTimeout(() => {
        alert("Something went Wrong")
    }, 1000);  
    }
  },
  dragAdd:(newNode)=>{
    console.log('newNode', newNode)
   set(state=>({
    nodes:[
      ...state.nodes,
      newNode
    ]
   }))
  },

  addAttackNode:(newNode)=>{
    console.log('newNode', newNode)
   set(state=>({
    attackNodes:[
      ...state.attackNodes,
      newNode
    ]
   }))
  },

  updateAttackNode:(nodeId,name)=>{
    set(state=>{
     let node = state.attackNodes.find(ite=>ite.id === nodeId);
     const ind = state.attackNodes.findIndex(ite=>ite.id === nodeId);
      node.data.label=name
     state.attackNodes[ind]=node
     return({
      attackNodes:[
      ...state.attackNodes
     ]})
    })
  
  },

  dragAddNode:(newNode,newEdge)=>{
    // console.log("store",newNode);
    set(state=>({
     nodes:state.nodes.concat(newNode),
     edges:state.edges.concat(newEdge)
    }))
   },

  addNewNode:async(newNode)=>{
    let tempNode = {"name": newNode.data.label, "id": newNode.id}
    console.log(tempNode);
    const res = await axios.post(`http://localhost:8000/`,tempNode);
   console.log('res', res)
  },

  deleteNode:async(id)=>{
    const res=await axios.delete(`${configuration.apiBaseUrl}sidebarNode/${id}`)
    console.log('res', res)
  },

  deleteTemplate:async(id)=>{
    const res=await axios.delete(`${configuration.apiBaseUrl}template/${id}`)
    console.log('res', res)
    if(res){
      setTimeout(() => {
        alert("Deleted Succesfully")
    }); 
    }
  },

  //Create New Modal
 createModal:async(newModal)=>{
  try{
    const res = await axios.post(`${configuration.apiBaseUrl}Modals`,newModal)
    if(res){
      console.log('res store', res);
      localStorage.setItem('currentId', res?.data?.id);
      return res;
    }
  }catch(err){
    console.log('err', err);
    if(err){
      alert("Something went Wrong")
    }
  }
},

}));

export default useStore;