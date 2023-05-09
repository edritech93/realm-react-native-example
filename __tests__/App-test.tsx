/**
 * @format
 */

import 'react-native';
import React from 'react';
import {create} from 'react-test-renderer';
import App from '../src/screens/App';
import Profile from '../src/database/Profile.database';
import Realm from 'realm';

const config = {
  schema: [Profile],
};
let realm: any;

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

  test('Close a Realm', async () => {
    expect(realm.isClosed).toBe(false);
    realm.close();
    expect(realm.isClosed).toBe(true);
  });

  test('renders correctly', () => {
    create(<App />);
  });
});
