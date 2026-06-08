export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Multi-Vendor Marketplace API',
    version: '0.1.0',
    description: 'Production marketplace API with dynamic RBAC, catalog, commerce, CMS, and reporting modules.'
  },
  servers: [
    {
      url: '/api/v1'
    }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service is healthy'
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a customer or vendor account',
        responses: {
          '201': {
            description: 'User created'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login with email and password',
        responses: {
          '200': {
            description: 'Authenticated session tokens'
          }
        }
      }
    }
  }
} as const;
