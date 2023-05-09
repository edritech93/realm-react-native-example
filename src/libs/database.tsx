import {createRealmContext} from '@realm/react';
import Realm from 'realm';
import Profile from '../database/Profile.database';

const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
