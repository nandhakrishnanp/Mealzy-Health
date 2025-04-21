import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
const Profile = ({navigation}) => {
  const [userData, setUserData] = React.useState(null);
  const GestUserData = async () => {
    const user = await AsyncStorage.getItem('userId');
    console.log('user', JSON.parse(user));
    const res = await axiosInstance.get(`/user/${JSON.parse(user)}`);
    console.log('res', res.data);
    setUserData(res.data.user);
  };
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  //   {
  //     "_id": "6803c728cfb212a507e861d9",
  //     "name": "nandhakrishnan",
  //     "password": "$2b$10$RTZIoc9hF2qfbmsdYbZkOOSZi7Zs/jUKiSDdjBRYyVZHduI/J0G0O",
  //     "phone": "9976765968",
  //     "createdAt": "2025-04-19T15:54:16.020Z",
  //     "updatedAt": "2025-04-19T15:54:16.020Z",
  //     "__v": 0
  // }

  useEffect(() => {
    GestUserData();
  }, []);
 
const options = [
  { id: '1', title: 'Edit Profile' },
  { id: '2', title: 'Change Password' },
  { id: '3', title: 'Notifications' },
  { id: '4', title: 'Privacy Settings' },
  { id: '5', title: 'Help & Support' },
];
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          padding: 10,
        }}>
        Profile
      </Text>

      <View
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          //justifyContent: 'center',
          gap: 10,
        }}>
          <View>

        <Image
          source={{
            uri: 'https://thumbs.dreamstime.com/b/mobile-342305929.jpg',
            width: 100,
            height: 100,
          }}
          style={{
            borderRadius: 50,
            marginTop: 10,
          }}
        />
          </View>
        <View style={{
          gap:5
        }} >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {userData?.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {userData?.phone}
          </Text>
        </View>
      </View>


      <View
        style={{
           marginHorizontal: 20,
           gap: 10,
           marginTop: 20,
        }}>
          
         {
            options.map((item) => (
              <TouchableOpacity
                key={item.id}
                // onPress={() => {
                //   navigation.navigate(item.title);
                // }}
                style={{
                 
                  padding: 10,
                  borderRadius: 10,
                  width: 150,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'Black',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))

         }

          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10, 
                backgroundColor: '#67AE6E',
                color: 'white',
                padding: 10,
                borderRadius: 18,
                width: 150,
                textAlign: 'center',
              }}>
              Logout
            </Text>
            
        </TouchableOpacity>




          </View> 
 
        

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
