import React from 'react';

function Modal({
                 showModal,
                 nodeName,
                 setNodeName,
                 inputCount,
                 setInputCount,
                 outputCount,
                 setOutputCount,
                 handleSubmit,
                 handleCancel
               }) {
  if (!showModal) return null;

  return (
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
          <div style={{marginBottom: '10px'}}>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              placeholder="Імʼя ноди"
              style={{width: '100%', padding: '8px', marginTop: '10px'}}
              required
            />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label>Кількість input:</label>
            <input
              type="number"
              min="1"
              value={inputCount}
              onChange={(e) => setInputCount(parseInt(e.target.value, 10) || 1)}
              style={{width: '100%', padding: '8px', marginTop: '5px'}}
              required
            />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label>Кількість output:</label>
            <input
              type="number"
              min="1"
              value={outputCount}
              onChange={(e) => setOutputCount(parseInt(e.target.value, 10) || 1)}
              style={{width: '100%', padding: '8px', marginTop: '5px'}}
              required
            />
          </div>
          <div style={{marginTop: '15px', textAlign: 'right'}}>
            <button type="submit" style={{marginRight: '10px'}}>
              Додати
            </button>
            <button type="button" onClick={handleCancel}>
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
