import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../../Zustand/store';
// import Levels from '../../views/Home/Levels';
import { useDispatch
  // , useSelector 
} from 'react-redux';
import { levelOpen } from '../../store/slices/CurrentIdSlice';

const selector = state =>({
  update:state.updateAttackNode
})
export default function TransferGate({ data,id }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const {update} = useStore(selector);

  useEffect(()=>{
    if(data.label) {setInputValue(data?.label)}
})
  // const { isLevelOpen } = useSelector(state=>state.currentId);
//   console.log('data', data)
 const handleDoubleClick = () => {
  const dts={
   label:data.label,
   id:id
  }
  dispatch(levelOpen(dts));
 } 

 const handleChange =(e)=>{
  const {value} = e.target;
  setInputValue(value);
  update(id,value);
 }
    return (
        <>
            <div onDoubleClick={handleDoubleClick}>
                <Handle type="target" position={Position.Top} style={{ top: '-13px',opacity:0 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="text" style={{ width: '100px',textAlign:'center',background:'transparent',border:'1px solid black' }} onChange={handleChange} value={inputValue}/>
                    <svg width="100px" height="100px" viewBox="0 100 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="none"
                            stroke="#000"
                            //eslint-disable-next-line
                            stroke-width="6"
                            transform="rotate(-90 256 256)"
                            d="M 105,111.3 V 400.7 L 365.5,256 Z M 16,247 v "
                        />
                    </svg>
                    
                </div>
                <Handle type="source" position={Position.Bottom} style={{ bottom: '20px',opacity:0 }} />
            </div>
            {/* {isLevelOpen && <Levels label={data?.label} id={id}/>} */}
        </>
    );
}
