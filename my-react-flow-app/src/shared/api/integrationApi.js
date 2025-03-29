import {baseApi} from './base';

export async function connectIntegration({service, token}) {
  return baseApi.post('/integrations/connect', {service, token});
}

export async function checkIntegrationStatus(integrationId) {
  return baseApi.get(`/integrations/${integrationId}/status`);
}
