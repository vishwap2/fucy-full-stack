
import React, { useState } from 'react';
import { EdgeLabelRenderer } from 'reactflow';

const CustomEdge = ({ id, source, target }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onEdgeDrag = (event) => {
    const newX = position.x + event.movementX;
    const newY = position.y + event.movementY;
    setPosition({ x: newX, y: newY });
  };

  return (
    <EdgeLabelRenderer
      id={id}
      source={source}
      target={target}
      onClick={(event) => console.log('Edge clicked', event)}
      onMouseDown={(event) => console.log('Edge mouse down', event)}
      onEdgeDrag={onEdgeDrag}
      style={{ stroke: '#000', strokeWidth: 2 }}
      arrowHeadType="arrowclosed"
    />
  );
};

export default CustomEdge;
