const { REACT_APP_API_URL, REACT_APP_API_PORT } = process.env;

export const API_URL =
  REACT_APP_API_URL && REACT_APP_API_PORT
    ? `http://${REACT_APP_API_URL}:${REACT_APP_API_PORT}`
    : `http://localhost:3001`;
