import AppUser from "../model/app-user";
import VerificationToken, { VerificationTokenModel } from "../model/verification-token";

export const VerificationTokenRepository = {
  getByUser(user: AppUser): Promise<VerificationToken | null> {
    return VerificationTokenModel.findOne({ user: user })
      .populate({
        path: 'appUser',
      })
      .lean()
      .exec();
  },

  getByToken(token: string): Promise<VerificationToken | null> {
    return VerificationTokenModel.findOne({ token: token })
      .populate({
        path: 'appUser',
      })
      .lean()
      .exec();
  },
}