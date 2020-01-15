import jwt_decode from 'jwt-decode';

export const decodeUser = (token) => {
  const decoded = jwt_decode(token);
  return decoded.user;
};

// decode.exp < new Date().getTime()