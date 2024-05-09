import React from "react";
import { Handle, Position } from 'reactflow';

const CircularNode = ({ data, isConnectable,type}) => {
  return (
    <>
      <div
        className={`circular-node ${type}`}
        style={{ 
          backgroundColor:`${data['bgColor']}`
          }}
      >
        <Handle
          className="handle"
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
          <div>{data?.label}</div>
        <Handle
          className="handle"
          type="range"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default CircularNode;
