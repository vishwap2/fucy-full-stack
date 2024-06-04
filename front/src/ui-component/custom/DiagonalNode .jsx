import React from "react";
import { Handle, NodeResizer, Position } from 'reactflow';

const DiagonalNode = ({ data, isConnectable,type}) => {
  // console.log('data', data)
  return (
    <>
        <NodeResizer  />
      <div
        className={`diagonal-node ${type}`}
        style={{ 
          ...data?.style
           }}
      >
       
        <Handle
          className="handle"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          />
          <div>{data?.label}</div>


        <Handle
          className="handle"
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          />
      </div>
    </>
  );
};

export default DiagonalNode;
