import React from 'react';

const CustomGroupNode = ({ data }) => {
    // console.log('data', data)
    return (
        <div
            style={{
                padding: '10px',
                borderRadius: '4px',
                width: data?.width ?? '250px',
                height: data?.height ?? '280px',
                border: '1px solid black'
            }}
        >
            <div style={{
              color:'black',
              textShadow:'none',
              fontWeight:600
            }}>{data?.label}</div>
        </div>
    );
};

export default CustomGroupNode;
