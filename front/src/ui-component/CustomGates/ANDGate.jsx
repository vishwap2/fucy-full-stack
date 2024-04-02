import React from 'react';
import { Handle, Position } from 'reactflow';

export default function ANDGate() {
    return (
        <div>
            <Handle type="target" position={Position.Top} style={{ top: '15px', opacity: 0 }} />
            <svg
                width="100px"
                height="100px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                // style={{ position: 'absolute', left: 0, top: 0 }}
            >
                <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="6"
                    transform="rotate(-90 256 256)"
                    d="M105 105v302h151c148 0 148-302 0-302H105zm-89"
                />
            </svg>
            <Handle type="source" position={Position.Bottom} style={{ bottom: '10px', opacity: 0 }} />
        </div>
    );
}
