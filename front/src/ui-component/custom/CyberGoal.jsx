import React from "react";
import { Handle, Position } from 'reactflow';

export default function CyberGoal ({ data, isConnectable,type}) {
  return (
    <>
      <div
        className={`${type}`}
        style={{ 
          backgroundColor:`${data['bgColor']}`
          }}
      >
        <Handle
          classname="handle"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
          <div>{data?.label}</div>
        <Handle
          classname="handle"
          type="range"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}
