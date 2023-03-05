import Keystore, { KeystoreModel } from '../model/keystore';
import { Types } from 'mongoose';
import AppUser from '../model/app-user';

async function findForKey (client: AppUser, key: string): Promise<Keystore | null> {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: key,
    status: true,
  })
    .lean()
    .exec();
}

async function remove (id: Types.ObjectId): Promise<Keystore | null> {
  return KeystoreModel.findByIdAndRemove(id).lean().exec();
}

async function removeAllForClient (client: AppUser) {
  return KeystoreModel.deleteMany({ client: client }).exec();
}

async function find (
  client: AppUser,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore | null> {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
  })
    .lean()
    .exec();
}

async function create (
  client: AppUser,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore> {
  const now = new Date();
  const keystore = await KeystoreModel.create({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
    createdAt: now,
    updatedAt: now,
  });
  return keystore.toObject();
}

export default {
  findForKey,
  remove,
  removeAllForClient,
  find,
  create,
};