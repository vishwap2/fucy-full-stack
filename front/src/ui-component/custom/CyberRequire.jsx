import React from "react";
import { Handle, Position } from 'reactflow';

export default function CyberRequire ({ data, isConnectable,type}) {
  return (
    <>
    <div className={`${type}`}>
          <div className={`${type}-inner`}>
          <div style={{color:'white'}}>{data?.label}</div>
          </div>
          <Handle
          classname="handle"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
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