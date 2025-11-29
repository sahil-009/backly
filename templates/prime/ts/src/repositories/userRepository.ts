import User, { IUser } from '../models/User';
import { NotFoundError, ConflictError } from '../utils/errors';

class UserRepository {
  async findById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select('+password');
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await this.findByEmail(userData.email!);
    if (existingUser) throw new ConflictError('User already exists with this email');
    return await User.create(userData);
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async delete(id: string): Promise<IUser> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async findAll(options: { skip?: number; limit?: number; filter?: any } = {}) {
    const { skip = 0, limit = 10, filter = {} } = options;
    const users = await User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments(filter);
    return { users, total };
  }

  async updateLastLogin(id: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { lastLogin: new Date() }, { new: true });
  }
}

export default new UserRepository();
