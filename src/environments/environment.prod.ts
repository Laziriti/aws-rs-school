import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://7zueh9vq0l.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://ksasg882n4.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'http://laziriti-cart-api-develop.eu-west-1.elasticbeanstalk.com/api',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
};
