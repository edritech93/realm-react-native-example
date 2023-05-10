import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../src/screens/App';
import Profile from '../src/database/Profile.database';
import Realm from 'realm';

const config = {
  schema: [Profile],
};
let realm: Realm;

describe('Test App', () => {
  beforeEach(async () => {
    realm = await Realm.open(config);
  });

  afterEach(() => {
    if (!realm.isClosed) {
      realm.close();
    }
    if (config) {
      Realm.deleteFile(config);
    }
  });

  test('write/read', async () => {
    realm.write(() => {
      realm.create('Profile', {
        name: 'Yudi',
        _id: new Realm.BSON.ObjectId(),
      });
    });
    await waitFor(() => {
      const data = realm.objects('Profile').toJSON();
      expect(data).toHaveLength(1);
      expect(data[0].name).toEqual('Yudi');
    });
  });

  test('Close a Realm', async () => {
    console.log('realm.isClosed => ', realm);
    expect(realm.isClosed).toBe(false);
    realm.close();
    expect(realm.isClosed).toBe(true);
  });

  test('renders correctly', () => {
    render(<App />);
  });
});
