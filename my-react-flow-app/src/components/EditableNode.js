import React, {useState} from "react";
import {Handle, Position} from "reactflow";

const EditableNode = ({data}) => {
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
          style={{width: '100%'}}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>{label}</div>
      )}
      <Handle type="target" position={Position.Left} style={{background: '#555'}}/>
      <Handle type="source" position={Position.Right} style={{background: '#555'}}/>
    </div>
  );
};

// export EditableNode...
