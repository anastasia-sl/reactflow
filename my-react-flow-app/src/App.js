import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const EditableNode = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    const onChange = (evt) => {
        setLabel(evt.target.value);
    };

    const onBlur = () => {
        setEditing(false);
        data.label = label;
    };

    return (
        <div
            style={{
                padding: '10px',
                background: '#fff',
                textAlign: 'center',
            }}
        >
            {editing ? (
                <input
                    value={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoFocus
                    className="nodrag"
                    style={{ width: '100%' }}
                />
            ) : (
                <div onDoubleClick={() => setEditing(true)}>{label}</div>
            )}
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
        </div>
    );
};

const nodeTypes = {
    default: EditableNode,
    input: EditableNode,
};

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

const nodeTemplates = [
    {label: 'Start', data: { label: 'START' }, style: { color: '#333' }},
    {label: 'If', data: { label: 'IF' }, style: { color: '#333' }},
    {label: 'Assign', data: { label: 'ASSIGN' }, style: { color: '#333' }},
    {label: 'Log', data: { label: 'LOG' }, style: { color: '#333' }},
    {label: 'End', data: { label: 'END' }, style: { color: '#333' }}
]

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [showModal, setShowModal] = useState(false);
    const [nodeName, setNodeName] = useState('');
    const [inputCount, setInputCount] = useState(1);
    const [outputCount, setOutputCount] = useState(1);
    const [selectedNode, setSelectedNode] = useState(null);

    function onNodesChange(changes) {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }

    function onEdgesChange(changes) {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }

    function onConnect(params) {
        setEdges((eds) => addEdge(params, eds));
    }

    const addNode = () => {
        setShowModal(true);
    };

    const onSelectionChange = (selection) => {
        const selNodes = selection.nodes;
        const selEdges = selection.edges;
        setSelectedNode(selNodes.length === 1 ? selNodes[0] : null);
    };

    const addNodeFromTemplate = (template) => {
        const newNode = {
            id: (nodes.length + 1).toString(),
            type: 'default',
            data: {...template.data},
            position: { x: 250, y: 150 },
            style: template.style,
        }
        setNodes((nds) => [...nds, newNode]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNode = {
            id: (nodes.length + 1).toString(),
            type: 'default',
            data: { label: nodeName, inputs: Number(inputCount), outputs: Number(outputCount) },
            position: {
                x: Math.random() * 400 + 50,
                y: Math.random() * 400 + 50,
            },
        };
        setNodes((nds) => nds.concat(newNode));
        setShowModal(false);
        setNodeName('');
        setInputCount(1);
        setOutputCount(1);
    };

    const handleCancel = () => {
        setShowModal(false);
        setNodeName('');
    };

    const handleLabelChange = (e) => {
        if(!selectedNode) return;
        const newLabel = e.target.value;
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNode.id
                    ? { ...node, data: { ...node.data, label: newLabel } }
                    : node
            )
        );
        setSelectedNode((prev) =>
            prev ? { ...prev, data: { ...prev.data, label: newLabel } } : null
        );
    };

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
            <div style={{ width: 150, borderRight: '1px solid #ccc', padding: 10 }}>
                <h4>Tools</h4>
                {nodeTemplates.map((tmpl, idx) => (
                    <button
                        key={idx}
                        style={{ display: 'block', marginBottom: 5, width: '100%' }}
                        onClick={() => addNodeFromTemplate(tmpl)}
                    >
                        {tmpl.label}
                    </button>
                ))}
                <button style={{ marginTop: 20, width: '100%' }} onClick={addNode}>
                    Add Node (Modal)
                </button>
                <button
                    style={{ marginTop: 20, width: '100%' }}
                    onClick={() => alert("Code")}
                >
                    Generate Code
                </button>
            </div>

            <div style={{ flexGrow: 1, position: 'relative' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onSelectionChange={onSelectionChange}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Background color="#aaa" gap={16} />
                    <Controls />
                </ReactFlow>
            </div>

            <div style={{ width: 200, borderLeft: '1px solid #ccc', padding: 10 }}>
                <h4>Property Panel</h4>
                {selectedNode ? (
                    <div>
                        <label style={{ display: 'block', marginBottom: 5 }}>
                            Label:
                            <input
                                style={{ width: '100%' }}
                                value={selectedNode.data.label}
                                onChange={handleLabelChange}
                            />
                        </label>
                    </div>
                ) : (
                    <div>No node selected</div>
                )}
            </div>

            {showModal && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 20,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            minWidth: '300px',
                        }}
                    >
                        <h3>Введіть імʼя ноди</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                    placeholder="Імʼя ноди"
                                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Кількість input:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={inputCount}
                                    onChange={(e) => setInputCount(e.target.value)}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Кількість output:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={outputCount}
                                    onChange={(e) => setOutputCount(e.target.value)}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginTop: '15px', textAlign: 'right' }}>
                                <button type="submit" style={{ marginRight: '10px' }}>
                                    Додати
                                </button>
                                <button type="button" onClick={handleCancel}>
                                    Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
