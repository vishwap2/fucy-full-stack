import React from 'react';
import { NodeResizer } from 'reactflow';

const CustomGroupNode = () => {
    // console.log('data', data)
    return (
      <>
      <NodeResizer  />
        <div
        className='group_node'
        >
            <div 
              style={{
              color:'black',
              textShadow:'none',
              fontWeight:600,
              height:'inherit',
              width:'inherit',
            }}>
                {/* {data?.label} */}
            </div>
        </div>
        </>
    );
};

export default CustomGroupNode;
