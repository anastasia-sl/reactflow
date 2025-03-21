import React, {useState} from 'react';
import {Handle, Position} from 'reactflow';
import '../styles/EditableNode.css';

function EditableNode({data}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  React.useEffect(() => {
    setLabel(data.label || '');
  }, [data.label]);

  const onChange = (evt) => {
    setLabel(evt.target.value);
  };

  const onBlur = () => {
    setEditing(false);
    data.label = label;
  };

  const inputsCount = data.inputs || 1;
  const outputsCount = data.outputs || 1;

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

      {Array.from({length: inputsCount}).map((_, i) => {
        const spacing = 100 / (inputsCount + 1);
        const topPercent = spacing * (i + 1);

        return (
          <Handle
            key={`in-${i}`}
            type="target"
            position={Position.Left}
            style={{
              top: `${topPercent}%`,
              transform: 'translateY(-50%)',
              background: '#555',
            }}
          />
        );
      })}

      {Array.from({length: outputsCount}).map((_, i) => {
        const spacing = 100 / (outputsCount + 1);
        const topPercent = spacing * (i + 1);

        return (
          <Handle
            key={`out-${i}`}
            type="source"
            position={Position.Right}
            style={{
              top: `${topPercent}%`,
              transform: 'translateY(-50%)',
              background: '#555',
            }}
          />
        );
      })}
    </div>
  );
}

export default EditableNode;
