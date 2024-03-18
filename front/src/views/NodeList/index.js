import React, { useEffect, useState } from "react";
// import { 
    // Button,Drawer,
    //  IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import useStore from "../../Zustand/store";
import AddIcon from "@mui/icons-material/Add";
// import AddComponentNew from "./AddComponentNew";
// import RemoveIcon from "@mui/icons-material/Remove";
import {
    CardEdit,
    KyberNetwork,
    ArrowUp,
    ArrowDown,
    ExportSquare,
    I3DCubeScan,
    People,
    UserRemove,
    UserTag,
    AudioSquare,
    Profile2User,
    Danger,
    Car,
    TheGraph
  } from 'iconsax-react';
import AddNewNode from "../../ui-component/Modal/AddNewNode";

const selector = (state) => ({
  sidebarNodes: state.sidebarNodes,
  getSidebarNode: state.getSidebarNode,
  deleteNode: state.deleteNode,
});

const iconComponents = {
    CardEdit,
    KyberNetwork,
    I3DCubeScan,
    Car,
    People,
    UserRemove,
    UserTag,
    AudioSquare,
    Profile2User,
    Danger,
    ArrowDown,
    ArrowUp,
    ExportSquare,
    TheGraph,
  };

  
const Components = () => {
  const [open, setOpen] = useState(false);
  const { sidebarNodes, getSidebarNode } = useStore(selector);
  useEffect(() => {
    getSidebarNode();
  }, []);

  // open & closing fn for Dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const Icon = ({ name, ...rest }) => {
    const IconComponent = iconComponents[name];
    return IconComponent ? <IconComponent {...rest} style={{ padding: 4 }} /> : null;
  };

  //To drag a element the data can be retrieved by using the setData's key
  const onDragStart = (event, item) => {
    const parseFile = JSON.stringify(item);
    event.dataTransfer.setData("application/parseFile", parseFile);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Box
        component="nav"
        aria-label="sidebar"
        sx={{display:'flex', gap:1.5, alignItems:'center'}}
      >
        
          {sidebarNodes.map((item, i) => (
            <div
              key={i}
              className={`dndnode ${item.type}`}
              style={{
                display:'flex',
                placeItems:'center'
              }}
            //   style={{
            //     border: `0.5px solid ${item?.data?.bgColor}`,
            //     boxShadow: `0px 0px 5px ${item?.data?.bgColor}`,
            //   }}
              onDragStart={(event) => onDragStart(event, item)}
              draggable
            >
                <Icon name={item?.icon} color='black'/>
              {item.data["label"]}
              {/* <span role = "button" aria-hidden="true" >
                <RemoveIcon
                  sx={{
                    fontSize: 16,
                    ml: 1,
                    cursor: "pointer",
                    background: "#aeaeae",
                    borderRadius: 10,
                    color: "white",
                    display: "grid",
                  }}
                />
              </span> */}
            </div>
          ))}
          {/* <IconButton
            aria-label="add"
            color="primary"
            // onClick={handleOpen}
            sx={{
              width: "fit-content",
              height: "fit-content",
              border: "2px solid",
              p: "4px",
            }}
          > */}
            <AddIcon sx={{ fontSize: 20 ,color:'blue',cursor:'pointer' }}   onClick={handleOpen}/>
          {/* </IconButton> */}
      </Box>
      {/* <AddComponentNew
        open={open}
        handleClose={handleClose}
        getSidebarNode={getSidebarNode}
      /> */}
      <AddNewNode
        open={open}
        handleClose={handleClose}
        getSidebarNode={getSidebarNode}
      />
    </>
  );
};

export default Components;
