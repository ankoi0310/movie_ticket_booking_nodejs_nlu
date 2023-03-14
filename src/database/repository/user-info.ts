import UserInfo, { UserInfoModel } from "../model/user-info";

export const UserInfoRepository = {
  async create(userInfo: UserInfo): Promise<UserInfo> {
    return UserInfoModel.create(userInfo);
  },

  async update(userInfo: UserInfo): Promise<UserInfo | null> {
    return UserInfoModel.findOneAndUpdate({ id: userInfo.id }, userInfo, { new: true });
  }
}