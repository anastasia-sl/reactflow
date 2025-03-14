import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls
} from 'reactflow';
import 'reactflow/dist/style.css';

import { v4 as uuidv4 } from 'uuid';

import EditableNode from './EditableNode';
import Sidebar from './Sidebar';
import PropertyPanel from './PropertyPanel';
import Modal from './Modal';
import './styles/FlowCanvas.css';

function FlowCanvas() {
    const initialNodes = useMemo(() => [
        {
            id: uuidv4(),
            type: 'input',
            data: { label: 'Вузол 1' },
            position: { x: 250, y: 5 },
        },
        {
            id: uuidv4(),
            data: { label: 'Вузол 2' },
            position: { x: 100, y: 100 },
        },
        {
            id: uuidv4(),
            data: { label: 'Вузол 3' },
            position: { x: 400, y: 100 },
        },
    ], []);

    const initialEdges = useMemo(() => [
        { id: uuidv4(), source: initialNodes[0].id, target: initialNodes[1].id, animated: true },
        { id: uuidv4(), source: initialNodes[0].id, target: initialNodes[2].id },
    ], [initialNodes]);

    const nodeTemplates = useMemo(() => [
        { label: 'Start', data: { label: 'START' }, style: { color: '#333' } },
        { label: 'If', data: { label: 'IF' }, style: { color: '#333' } },
        { label: 'Assign', data: { label: 'ASSIGN' }, style: { color: '#333' } },
        { label: 'Log', data: { label: 'LOG' }, style: { color: '#333' } },
        { label: 'End', data: { label: 'END' }, style: { color: '#333' } },
    ], []);

    const nodeTypes = useMemo(() => ({
        default: EditableNode,
        input: EditableNode,
    }), []);

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const [showModal, setShowModal] = useState(false);
    const [nodeName, setNodeName] = useState('');
    const [inputCount, setInputCount] = useState(1);
    const [outputCount, setOutputCount] = useState(1);
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const onSelectionChange = useCallback((selection) => {
        const selNodes = selection?.nodes || [];
        setSelectedNode(selNodes.length === 1 ? selNodes[0] : null);
    }, []);

    const addNode = useCallback(() => {
        setShowModal(true);
    }, []);

    const addNodeFromTemplate = useCallback((template) => {
        const newNode = {
            id: uuidv4(),
            type: 'default',
            data: { ...template.data },
            style: template.style,
            position: { x: 250, y: 150 },
        };
        setNodes((nds) => [...nds, newNode]);
    }, []);

    const handleLabelChange = useCallback((e) => {
        if (!selectedNode) return;
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
    }, [selectedNode]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const newNode = {
            id: uuidv4(),
            type: 'default',
            data: {
                label: nodeName,
                inputs: Number(inputCount),
                outputs: Number(outputCount),
            },
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
    }, [nodeName, inputCount, outputCount]);

    const handleCancel = useCallback(() => {
        setShowModal(false);
        setNodeName('');
        setInputCount(1);
        setOutputCount(1);
    }, []);

    return (
        <div className="flowCanvas">
            <Sidebar
                nodeTemplates={nodeTemplates}
                addNodeFromTemplate={addNodeFromTemplate}
                addNode={addNode}
            />

            <div className="reactFlowWrapper">
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

            <PropertyPanel
                selectedNode={selectedNode}
                handleLabelChange={handleLabelChange}
            />

            <Modal
                showModal={showModal}
                nodeName={nodeName}
                setNodeName={setNodeName}
                inputCount={inputCount}
                setInputCount={setInputCount}
                outputCount={outputCount}
                setOutputCount={setOutputCount}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default FlowCanvas;
