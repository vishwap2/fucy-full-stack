import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../../Zustand/store';

const selector = (state) => ({
    update: state.updateAttackNode
});
export default function Event({ data, id }) {
    const { update } = useStore(selector);
    const [inputValue, setInputValue] = useState('');
    // console.log('data', data);

    useEffect(()=>{
        if(data.label) {setInputValue(data?.label)}
    })
    const handleChange = (e) => {
        const  {value}  = e.target;
        // console.log('value', value)
        setInputValue(value);
        update(id, value);
    };

    return (
        <>
                <Handle type="target" position={Position.Top} style={{ top: '-12px',opacity:0}} />
                {/* <div 
                contentEditable='true'
                onInput={handleChange}
                style={{
                    borderRadius:'4px',
                    width:'auto',
                    minWidth: '100px',
                    color:'black',
                    textShadow:'none',
                    // maxWidth: 'auto',
                    textAlign: 'center',
                    background: 'transparent',
                    border: '1px solid gray',
                    padding:'2px 5px'
                }}
                >

                </div> */}
                    <div>
                    <input
                    type="text"
                    value={inputValue}
                    style={{
                        borderRadius:'4px',
                        width: `${Math.max(100, inputValue.length * 7)}px`,
                        minWidth: '100px',
                        maxWidth: 'auto',
                        textAlign: 'center',
                        background: 'transparent',
                        border: '1px solid gray'
                    }}
                    onChange={handleChange}
                    />
                    </div>
                <Handle type="source" position={Position.Bottom} style={{ bottom: '-12px',opacity:0}} />
        </>
    );
}
