import React from 'react';

function PropertyPanel({ selectedNode, handleLabelChange }) {
    return (
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
    );
}

export default PropertyPanel;
