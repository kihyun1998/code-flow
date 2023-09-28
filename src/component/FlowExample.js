import ReactFlow, { 
    Background, 
    applyEdgeChanges, 
    applyNodeChanges,
    addEdge,
    MiniMap
} from 'reactflow';

import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import CustomNode from '../custom-component/CustomNode';
import CustomControl from '../custom-component/CustomControl';
import CustomMiniMap from '../custom-component/CustomMiniMap';
import CustomReactFlow from '../custom-component/CustomReactFlow';

const NodeTypes = {
    custom: CustomNode,
};

const initialNodes = [
        {
            id: '1',
            data: { label: 'Hello' },
            position: { x: 0, y: 0 },
            type: 'custom',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
            type: 'custom',
        },
    ];

const initialEdges = [
    {
        // id:'1-2',
        // source: '1',
        // target: '2',
        // label: 'to',
        // type: 'step'
    }
]

function FlowExample() {
    const [nodes,setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // node can click & drag
    const onNodesChange = useCallback(
        (changes) => setNodes(
            (nds)=>applyNodeChanges(changes,nds)
        ),[]
    );
    // node drag 시 edge도 따라가야되서(maybe?)
    const onEdgesChange = useCallback(
        (changes) => setNodes(
            (nds) => applyEdgeChanges(changes,nds)
        ),[]
    );


    const onConnect = useCallback(
        (params) => setEdges(
            (eds) =>  addEdge(params,eds)
        ),[]
    );


    return (
        <div className='flow-space'>
            <CustomReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={NodeTypes}
            >
                <Background />
                <MiniMap />
                <CustomControl/>
                <CustomMiniMap/>
                
            </CustomReactFlow>
        </div>
    );
}

export default FlowExample;