import userRepository from '../repositories/userRepository';
import { generateToken } from '../utils/helpers';
import { UnauthorizedError, BadRequestError } from '../utils/errors';
import { IUser } from '../models/User';

class AuthService {
  async register(userData: { name: string; email: string; password: string }) {
    const user = await userRepository.create(userData);
    const token = generateToken(user._id.toString());
    return { user, token };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password');
    }

    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) throw new UnauthorizedError('Invalid credentials');
    if (!user.isActive) throw new UnauthorizedError('Account is deactivated');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials');

    await userRepository.updateLastLogin(user._id.toString());
    const token = generateToken(user._id.toString());

    return { user, token };
  }

  async getProfile(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  async updateProfile(userId: string, updateData: any): Promise<IUser> {
    delete updateData.password;
    delete updateData.role;
    delete updateData.permissions;
    return await userRepository.update(userId, updateData);
  }
}

export default new AuthService();
