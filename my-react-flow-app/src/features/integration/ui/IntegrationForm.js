import React, {useState} from 'react';
import {useIntegration} from '../model/useIntegration';
import '../../../styles/IntegrationForm.css';

export const IntegrationForm = () => {
  const {loading, error, connect} = useIntegration();
  const [service, setService] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await connect(service, token);
  };

  return (
    <form className="integrationForm" onSubmit={handleSubmit}>
      <h4>Connect Integration</h4>

      <div className="formGroup">
        <label>Service:</label>
        <input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="openai / gmail / meta..."
        />
      </div>

      <div className="formGroup">
        <label>Token:</label>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="API token..."
        />
      </div>

      {error && <div className="errorText">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Connecting...' : 'Connect'}
      </button>
    </form>
  );
};
