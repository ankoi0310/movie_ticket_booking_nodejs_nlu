import AppUser, { AppUserModel } from '../model/app-user';
import { Types } from 'mongoose';
import { RoleModel } from '../model/role';
import { InternalServerError } from '../../core/handler/app-error';
import Keystore from '../model/keystore';
import KeystoreRepository from './keystore';

export const AppUserRepository = {
  async exists(id: Types.ObjectId): Promise<boolean> {
    const user = await AppUserModel.exists({ _id: id });
    return user !== null && user !== undefined;
  },

  async getById(id: Types.ObjectId): Promise<AppUser | null> {
    return AppUserModel.findOne({ _id: id, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
      })
      .lean()
      .exec();
  },

  async getByEmail(email: string): Promise<AppUser | null> {
    return AppUserModel.findOne({ email: email })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
      })
      .lean()
      .exec();
  },

  async getFieldsById(id: Types.ObjectId, ...fields: string[]): Promise<AppUser | null> {
    return AppUserModel
      .findOne({ _id: id, status: true }, [...fields])
      .lean()
      .exec();
  },

  async getPrivateProfileById(id: Types.ObjectId): Promise<AppUser | null> {
    return AppUserModel
      .findOne({ _id: id, status: true })
      .select('+email +userInfo +roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { type: 1 },
      })
      .populate({
        path: 'userInfo',
        match: { status: true },
        select: { fullName: 1, phone: 1, profilePicUrl: 1 },
      })
      .lean<AppUser>()
      .exec();
  },

  async getPublicProfileById(id: Types.ObjectId): Promise<AppUser | null> {
    return AppUserModel.findOne({ _id: id, status: true }).lean().exec();
  },

  async create(
    user: AppUser,
    accessToken: string,
    refreshToken: string,
    roleType: string): Promise<{ user: AppUser; keystore: Keystore }> {
    const role = await RoleModel.findOne({ type: roleType })
      .select('+type')
      .lean()
      .exec();

    if (!role) throw new InternalServerError('Role must be specified');

    user.roles = [role];
    const newUser = await AppUserModel.create(user);
    if (!newUser) throw new InternalServerError('User creation failed');

    const keystore = await KeystoreRepository.create(newUser, accessToken, refreshToken);

    return {
      user: { ...newUser.toObject(), roles: user.roles },
      keystore: keystore
    };
  },

  async update(user: AppUser, accessToken: string, refreshToken: string): Promise<{ user: AppUser; keystore: Keystore }> {
    user.updatedAt = new Date();
    await AppUserModel
      .updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreRepository.create(user, accessToken, refreshToken);
    return { user: user, keystore: keystore };
  },

  async updateInfo(user: AppUser): Promise<void> {
    user.updatedAt = new Date();
    await AppUserModel.updateOne({ _id: user._id }, { $set: { userInfo: user.userInfo } }).lean().exec();
  },

  async changePassword(user: AppUser): Promise<void> {
    await AppUserModel
      .updateOne({ _id: user._id }, { $set: { password: user.password } })
      .lean()
      .exec();
  },
};