export enum DomainErrorCode {
  UNKNOWN = 'UNKNOWN',

  AUTHN = 'AUTHN',
  AUTHN_JWT_INVALID_TOKEN = 'AUTHN_JWT_INVALID_TOKEN',
  AUTHN_LOGIN_INVALID_USERNAME = 'AUTHN_LOGIN_INVALID_USERNAME',
  AUTHN_LOGIN_INVALID_PASSWORD = 'AUTHN_LOGIN_INVALID_PASSWORD',
  AUTHN_COOKIE_NOT_FOUND = 'AUTHN_COOKIE_NOT_FOUND',
  AUTHN_PAYLOAD_INVALID = 'AUTHN_PAYLOAD_INVALID',

  AUTHZ = 'AUTHZ',
  AUTHZ_AUTHENTICATION_REQUIRED = 'AUTHZ_AUTHENTICATION_REQUIRED',
  AUTHZ_PERMISSION_DENIED = 'AUTHZ_PERMISSION_DENIED',
  AUTHZ_CONTEXT_INVALID = 'AUTHZ_CONTEXT_INVALID',

  ENTITY = 'ENTITY',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  ENTITY_CANNOT_DELETE = 'ENTITY_CANNOT_DELETE',
  ENTITY_POPULATE_PATH_UNKNOWN = 'ENTITY_POPULATE_PATH_UNKNOWN',
  ENTITY_SAMPLE_ID_ALREADY_EXISTS = 'ENTITY_SAMPLE_ID_ALREADY_EXISTS',
  ENTITY_TEST_INVALID_BIO_PRODUCT = 'ENTITY_TEST_INVALID_BIO_PRODUCT',

  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
  BROWSER_SERVICE = 'BROWSER_SERVICE',
  BROWSER_SERVICE_EXCEPTION = 'BROWSER_SERVICE_EXCEPTION',

  REQUEST = 'REQUEST',
  REQUEST_INVALID_INPUT = 'REQUEST_INVALID_INPUT',
}
