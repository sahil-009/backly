import userRepository from '../repositories/userRepository';
import { paginate, buildPaginationMeta } from '../utils/helpers';
import { IUser } from '../models/User';

class UserService {
  async getAllUsers(page: number = 1, limit: number = 10, filter: any = {}) {
    const { skip, limit: parsedLimit } = paginate(page, limit);
    const { users, total } = await userRepository.findAll({ skip, limit: parsedLimit, filter });
    const meta = buildPaginationMeta(total, page, parsedLimit);
    return { users, meta };
  }

  async getUserById(id: string): Promise<IUser> {
    return await userRepository.findById(id);
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
    return await userRepository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<IUser> {
    return await userRepository.delete(id);
  }

  async updateUserRole(id: string, role: string, permissions: string[] = []): Promise<IUser> {
    return await userRepository.update(id, { role, permissions } as any);
  }

  async deactivateUser(id: string): Promise<IUser> {
    return await userRepository.update(id, { isActive: false } as any);
  }

  async activateUser(id: string): Promise<IUser> {
    return await userRepository.update(id, { isActive: true } as any);
  }
}

export default new UserService();
