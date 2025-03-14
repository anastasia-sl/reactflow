import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowCanvas from './components/FlowCanvas';

export default function App() {
  return (
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
  );
}
