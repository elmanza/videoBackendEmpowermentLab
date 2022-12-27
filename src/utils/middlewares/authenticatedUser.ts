import AuthMiddleware from '../../components/authenticationTMDB/middlewares/authMiddleware';

export const authenticatedUser = [
  AuthMiddleware.getAuthenticatedUser
];
