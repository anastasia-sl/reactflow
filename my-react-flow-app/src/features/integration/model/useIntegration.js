import {useState} from 'react';
import {checkIntegrationStatus, connectIntegration} from "../../../shared/api/integrationApi";

export function useIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connect = async (service, token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await connectIntegration({service, token});
      return response.data;
    } catch (err) {
      setError('Connect failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (integrationId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkIntegrationStatus(integrationId);
      return response.data?.status;
    } catch (err) {
      setError('Check status failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    connect,
    checkStatus,
  };
}
