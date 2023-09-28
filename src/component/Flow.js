import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';

const initialNodes = [
        {
            id: '1',
            data: { label: 'Hello' },
            position: { x: 0, y: 0 },
            type: 'input',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
        },
    ];

const initialEdges = [
    {
        id:'1-2',
        source: '1',
        target: '2',
        label: 'to',
        type: 'step'
    }
]

function Flow() {
    const [nodes,setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // 노드 can click & drag
    const onNodesChange = useCallback(
        (changes) => setNodes(
            (nds)=>applyNodeChanges(changes,nds)
        ),[]
    )

    const onEdgesChange = useCallback(
        (changes) => setNodes(
            (nds) => applyEdgeChanges(changes,nds)
        ),[]
    )


    return (
        <div style={{ height: '100%' }}>
        <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            <Background />
            <Controls />
        </ReactFlow>
        </div>
    );
}

export default Flow;