import React from 'react';
import '../styles/Sidebar.css';
import {IntegrationForm} from "../features/integration/ui/IntegrationForm";


function Sidebar({nodeTemplates, addNodeFromTemplate, addNode}) {
  return (
    <div className="sidebar">
      <h4>Tools</h4>
      {nodeTemplates.map((tmpl, idx) => (
        <button
          key={idx}
          className="sidebar-btn"
          onClick={() => addNodeFromTemplate(tmpl)}
        >
          {tmpl.label}
        </button>
      ))}

      <button
        className="sidebar-btn add-node-btn"
        onClick={addNode}
      >
        Add Node (Modal)
      </button>

      <button
        className="sidebar-btn"
        onClick={() => alert('Code')}
      >
        Generate Code
      </button>

      <IntegrationForm/>
    </div>
  );
}

export default Sidebar;
