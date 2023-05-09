import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {useQuery, useRealm} from '../libs/database';
import Profile from '../database/Profile.database';

const ProfileScreen = () => {
  const [dataProfile, setDataProfile] = useState<any[]>([]);

  const realm = useRealm();
  const qProfile = useQuery(Profile);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    // NOTE: test query
    // const data: any = qProfile.filtered('_id == $0', profile._id);
    const data: any = qProfile.sorted('_id');
    setDataProfile(data);
  };

  const addProfile = (name: string) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.ObjectId(),
      });
    });
  };

  const changeProfileName = (profile: Profile, newName: string) => {
    realm.write(() => {
      profile.name = newName;
    });
  };

  const deleteProfile = (profile: Profile) => {
    realm.write(() => {
      realm.delete(profile);
    });
  };

  const _renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.text}>{item.name}</Text>
      <Button
        title={'EDIT'}
        onPress={() => {
          changeProfileName(item, `profile-${Math.random()}`);
        }}
      />
      <Button title={'DELETE'} onPress={() => deleteProfile(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataProfile}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        ListEmptyComponent={<Text>No Data</Text>}
      />
      <View style={styles.wrapButton}>
        <Button
          title={'ADD'}
          onPress={() => addProfile(`profile-${dataProfile.length}`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  wrapButton: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    margin: 8,
    padding: 16,
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;
