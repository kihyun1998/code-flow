import React from 'react';

export default ({
    fromX,
    fromY,
    fromPosition,
    toX,
    toY,
    toPosition,
    connectionLineType,
    connectionLineStyle,
}) => {
    return (
        <g>
        <path
            fill="none"
            stroke="#B1B1B7"
            strokeWidth={1}
            className="animated"
            connectionLineType="smoothstep"
            d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
        />
        <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="#B1B1B7" strokeWidth={1} />
        </g>
    );
};
