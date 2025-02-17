import React, { useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Вузол 1' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        data: { label: 'Вузол 2' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { label: 'Вузол 3' },
        position: { x: 400, y: 100 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
];

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    function onNodesChange(changes) {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }

    function onEdgesChange(changes) {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }

    function onConnect(params) {
        setEdges((eds) => addEdge(params, eds));
    }

    function addNode() {
        const newNode = {
            id: (nodes.length + 1).toString(),
            data: { label: `Вузол ${nodes.length + 1}` },
            position: {
                x: Math.random() * 400 + 50,
                y: Math.random() * 400 + 50,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }

    return (
        <div style={{ height: '100vh' }}>
            <button
                onClick={addNode}
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: 10,
                    left: 10,
                    padding: '8px 12px',
                }}
            >
                Додати вузол
            </button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background color="#aaa" gap={16} />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default function App() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}
