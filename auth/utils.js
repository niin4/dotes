import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800,
  });
};
