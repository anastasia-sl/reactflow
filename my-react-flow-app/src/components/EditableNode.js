import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './styles/EditableNode.css';

function EditableNode({ data }) {
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
        <div className="editableNode">
            {editing ? (
                <input
                    value={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoFocus
                    className="nodrag nodeInput"
                />
            ) : (
                <div
                    onDoubleClick={() => setEditing(true)}
                    className="nodeLabel"
                >
                    {label}
                </div>
            )}

            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
            />
        </div>
    );
}

export default EditableNode;
