import React from "react";
import { Handle, NodeResizer, Position } from 'reactflow';

const OutputNode = ({ data, isConnectable,type}) => {
  return (
    <>
        <NodeResizer />
      <div
        className={`my-custom-node ${type}`}
        style={{ 
          backgroundColor:`${data['bgColor']}`
          }}
      >
          <div>{data?.label}</div>
        <Handle
          className="handle"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default OutputNode;
