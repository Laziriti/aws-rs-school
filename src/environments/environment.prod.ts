import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
