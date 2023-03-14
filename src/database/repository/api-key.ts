import ApiKey, { ApiKeyModel } from '../model/api-key';

async function findByKey (key: string): Promise<ApiKey | null> {
  return ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
}

export default {
  findByKey,
};