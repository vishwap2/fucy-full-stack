import { createWithEqualityFn } from 'zustand/traditional';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

import axios from 'axios';
import { configuration } from '../services/baseApiService';

const useStore = createWithEqualityFn((set, get) => ({
    attackNodes: [],
    attackEdges: [],
    cyberNodes: [],
    cyberEdges: [],
    nodes: [],
    edges: [],
    sidebarNodes: [],
    template: [],
    selectedTemplate: {},
    Modals: [],
    modal: {},
    DamageScenaris: [],
    scenerio: {},
    component: [],

    //Normal Nodes
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes)
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges)
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges)
        });
    },
    setNodes: (newNodes) => {
        set({
            nodes: newNodes
        });
    },
    setEdges: (newEdges) => {
        set({
            edges: newEdges
        });
    },

    //Attack tree Section
    onAttackNodesChange: (changes) => {
        set({
            attackNodes: applyNodeChanges(changes, get().attackNodes)
        });
    },
    onAttckEdgesChange: (changes) => {
        set({
            attackEdges: applyEdgeChanges(changes, get().attackEdges)
        });
    },
    onAttackConnect: (connection) => {
        set({
            attackEdges: addEdge(connection, get().attackEdges)
        });
    },

    setAttackNodes: (newNodes) => {
        set({
            attackNodes: newNodes
        });
    },

    setAttackEdges: (newEdges) => {
        set({
            attackEdges: newEdges
        });
    },

    //Cybersecurity Section
    onCyberNodesChange: (changes) => {
        set({
            cyberNodes: applyNodeChanges(changes, get().cyberNodes)
        });
    },
    onCyberEdgesChange: (changes) => {
        set({
            cyberEdges: applyEdgeChanges(changes, get().cyberEdges)
        });
    },
    onCyberConnect: (connection) => {
        set({
            cyberEdges: addEdge(connection, get().cyberEdges)
        });
    },
    setCyberNodes: (newNodes) => {
        set({
            cyberNodes: newNodes
        });
    },

    setCyberEdges: (newEdges) => {
        set({
            cyberEdges: newEdges
        });
    },

    getIntersectingNodes: () => {
        const nodes = get().nodes;
        // console.log('nodes store', nodes)
        const group = nodes?.find(nd=>nd?.type ==='group');
        const area={};
    
        area.x=group?.position.x,
        area.y=group?.position?.y,
        area.width=group.width, 
        area.height=group.height
        
        // console.log('area', area);
        // console.log('nodes12', nodes)
        // Check if two rectangles intersect based on their positions and dimensions
        // const doRectanglesIntersect = (area, node) => {

        //   return (
        //     // rect1.x >= rect2.x + rect2.width || // rect1 is to the right of rect2
        //     // rect1.x + rect1.width <= rect2.x || // rect1 is to the left of rect2
        //     // rect1.y >= rect2.y + rect2.height || // rect1 is below rect2
        //     // rect1.y + rect1.height <= rect2.y // rect1 is above rect2
        //      area.x <= node.x

        //   );
        // };

        function doNodesTouch(nodeA, nodeB) {
            // console.log('nodeA', nodeA)
            // console.log('nodeB', nodeB)
            const aLeft = nodeA.x;
            const aRight = nodeA.x + nodeA.width;
            const aTop = nodeA.y;
            const aBottom = nodeA.y + nodeA.height;
          
            const bLeft = nodeB.x;
            const bRight = nodeB.x + nodeB.width;
            const bTop = nodeB.y;
            const bBottom = nodeB.y + nodeB.height;
          
            const horizontalOverlap = aRight >= bLeft && aLeft <= bRight;
            const verticalOverlap = aBottom >= bTop && aTop <= bBottom;
          
            return horizontalOverlap && verticalOverlap;
          }

        const intersectingNodes = nodes.filter(node => {
            const nodeRect = {
              x: node.position.x,
              y: node.position.y,
              width: node.width,
              height: node.height,
            };
            return doNodesTouch(area,nodeRect);
          });
       
          return [intersectingNodes, nodes];
        },
    //fetch or GET section
    fetchAPI: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}template`);
        set({
            template: res.data
        });
    },

    getSidebarNode: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}sidebarNode`);
        set({
            sidebarNodes: res.data
        });
    },

    getTemplate: async (id) => {
        const res = await axios.get(`${configuration.apiBaseUrl}template?id=${id}`);
        set({
            selectedTemplate: res.data[0],
            nodes: res['data'][0]['template']['nodes'],
            edges: res['data'][0]['template']['edges']
        });
    },

    getModals: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}Modals`);
        set({
            Modals: res.data
        });
    },

    getModalById: async (id) => {
        if(id){const res = await axios.get(`${configuration.apiBaseUrl}Modals/${id}`);
        console.log('res.data ...', res.data);
        set({
            modal: res.data
        });}
    },
    getDamageScenarios: async () => {
        const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios`);
        set({
            DamageScenaris: res.data
        });
    },
    getUniqueDamageScenario: async (id) => {
        const res = await axios.get(`${configuration.apiBaseUrl}Damage-scenarios/${id}`);
        set({
            scenerio: res.data
        });
    },

    getComponent: async () => {
      const res = await axios.get(`${configuration.backendUrl}getComponent`);
      console.log('res', res);
      // set({
      //   component:res.data,
      // })
  },

    //Update Section

    updateTemplate: async (newTemplate) => {
        const res = await axios.patch(`${configuration.apiBaseUrl}template/${newTemplate.id}`, newTemplate);
        console.log('res', res);
    },

    updateModal: async (newModal) => {
        console.log('newModal', newModal);
        const res = await axios.patch(`${configuration.apiBaseUrl}Modals/${newModal?.id}`, newModal);
        console.log('res', res);
        if (res) {
            // alert('Updated');
            // window.location.reload();
            console.log('res', res)
            return res;
        }
    },

    
    updateAttackNode: (nodeId, name) => {
      set((state) => {
          let node = state.attackNodes.find((ite) => ite.id === nodeId);
          const ind = state.attackNodes.findIndex((ite) => ite.id === nodeId);
          node.data.label = name;
          state.attackNodes[ind] = node;
          return {
              attackNodes: [...state.attackNodes]
          };
      });
  },

    //Add Section

    createComponent: async (newTemplate) => {
        // const res = await axios.post(`${configuration.backendUrl}createComponent`,newTemplate)
        const res = await axios.post(`${configuration.backendUrl}createComponent`, newTemplate);
        console.log('res', res);
    },

    addTemplate: async (newTemplate) => {
        try {
            const res = await axios.post(`${configuration.apiBaseUrl}template`, newTemplate);
            // console.log('res store', res)
            if (res) {
                setTimeout(() => {
                    // alert('Added Succesfully');
                    window.location.reload();
                }, 500);
            }
        } catch (err) {
            console.log('err', err)
            // setTimeout(() => {
                // alert('Something went Wrong');
            // }, 1000);
        }
    },

    addDamageScenario: async (newTemplate) => {
        console.log('newTemplate', newTemplate);
        try {
            const res = await axios.post(`${configuration.apiBaseUrl}Damage-scenarios`, newTemplate);
            // console.log('res store', res)
            if (res) {
              return res;
            }
        } catch (err) {
            console.log('err', err)
            // setTimeout(() => {
            //     alert('Something went Wrong');
            // }, 1000);
        }
    },

    dragAdd: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            nodes: [...state.nodes, newNode]
        }));
    },

    addAttackNode: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            attackNodes: [...state.attackNodes, newNode]
        }));
    },

    dragAddNode: (newNode, newEdge) => {
        // console.log("store",newNode);
        set((state) => ({
            nodes: state.nodes.concat(newNode),
            edges: state.edges.concat(newEdge)
        }));
    },
    
    addNewNode: async (newNode) => {
        // console.log('newNode',newNode);
        const res = await axios.post(`${configuration.apiBaseUrl}sidebarNode`, newNode);
        console.log('res', res);
    },

    createModal: async (newModal) => {
          try {
              const res = await axios.post(`${configuration.apiBaseUrl}Modals`, newModal);
              if (res) {
                  console.log('res store', res);
                  localStorage.setItem('currentId', res?.data?.id);
                  return res;
              }
          } catch (err) {
              console.log('err', err);
            //   if (err) {
            //       alert('Something went Wrong');
            //   }
          }
      },

      addCyberNode: (newNode) => {
        // console.log('newNode', newNode);
        set((state) => ({
            cyberNodes: [...state.cyberNodes, newNode]
        }));
    },

    //Delete Section 

    deleteNode: async (id) => {
        const res = await axios.delete(`${configuration.apiBaseUrl}sidebarNode/${id}`);
        console.log('res', res);
    },

    deleteTemplate: async (id) => {
        const res = await axios.delete(`${configuration.apiBaseUrl}template/${id}`);
        console.log('res', res);
        if (res) {
            setTimeout(() => {
                alert('Deleted Succesfully');
            });
        }
    },


}));

export default useStore;
