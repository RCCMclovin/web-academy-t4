import { AuthDTO } from './auth.types';
import userService from '../user/user.service';
import { compare } from 'bcryptjs';

export const checkAuth = async (
  credentials: AuthDTO,
): Promise<string | null> => {
  const user = await userService.findUserByEmail(credentials.email);
  if (user && (await compare(credentials.password, user.password)))
    return user.id;
  return null;
};
