import React from 'react';
import {RealmProvider} from '../libs/database';
import ProfileScreen from './ProfileScreen';

const App = () => {
  return (
    <RealmProvider>
      <ProfileScreen />
    </RealmProvider>
  );
};

export default App;
