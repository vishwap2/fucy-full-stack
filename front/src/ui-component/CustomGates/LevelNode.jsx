import React from 'react'
import { Handle, Position } from 'reactflow';
import { levelClose } from '../../store/slices/CurrentIdSlice';
import { useDispatch } from 'react-redux';

const LevelNode = ({data,isConnectable}) => {
    const dispatch = useDispatch();
  return (
    <>
    <div
    className={`level_node`}
    onDoubleClick={()=>dispatch(levelClose())}
    // style={{ 
    //   backgroundColor:`${data['bgColor']}`
    //   }}
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
      type="range"
      position={Position.Bottom}
      isConnectable={isConnectable}
    />
  </div>
</>
  )
}

export default LevelNode