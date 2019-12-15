import { AsyncStorage } from 'react-native';

const legacyStorage = new LegacyStorage();

export const StorageModel = {
  user: {
    name: String,
    token: String
  }
};

const storage = AsyncStorageFactory.create(legacyStorage);

export default storage;
