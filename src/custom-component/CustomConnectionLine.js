import React from 'react';

export default ({
    fromX,
    fromY,
    fromPosition,
    toX,
    toY,
    toPosition,
    connectionLineType,
    connectionLineStyle
}) => {

    return (
        <g>
            <path
                fill="none"
                stroke="red"
                strokeWidth={1}
                className="animated"
                connectionLineType="smoothstep"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <circle cx={toX} cy={toY} fill="red" r={3} stroke="red" strokeWidth={1} />
        </g>
    );
};
