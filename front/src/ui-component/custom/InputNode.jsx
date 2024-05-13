import React from "react";
import { Handle, NodeResizer, Position } from 'reactflow';

const InputNode = ({ data, isConnectable,type}) => {
  return (
    <>
        <NodeResizer  />
      <div
        className={`my-custom-node ${type}`}
        style={{ 
          backgroundColor:`${data['bgColor']}`
          }}
      >
        <Handle
          className="handle"
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
          <div>{data?.label}</div>

      </div>
    </>
  );
};

export default InputNode;
