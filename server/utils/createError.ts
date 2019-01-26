interface ErrorObject {
  isError: boolean,
  message: string
}

/**
 * Helper for creating errors faster without need of writing verbose properties
 * @param message - Error message or error code
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const createError = (message: number | string) => {
  const error: ErrorObject = {
    isError: true,
    message: 'Unknown error.'
  };

  switch (message) {
    case 500:
      error.message = 'Internal server error occured.';
      break;
    default:
      error.message = <string>message;
  }

  return error;
}

export default createError;
