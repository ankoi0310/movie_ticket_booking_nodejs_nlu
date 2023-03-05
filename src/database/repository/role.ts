import Role, { RoleModel } from '../model/role';

export const RoleRepository = {
  async findByType(type: string): Promise<Role | null> {
    return RoleModel.findOne({ type: type, status: true }).lean().exec();
  },

  async findByTypes(types: string[]): Promise<Role[]> {
    return RoleModel.find({ type: { $in: types }, status: true })
      .lean()
      .exec();
  }
}