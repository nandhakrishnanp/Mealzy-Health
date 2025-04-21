import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {use, useState} from 'react';
import Toast from 'react-native-toast-message';
import axiosInstance from '../axiosInstance';
import { set } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}:any) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');

  const handleLogin =async () => {
     Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'You have successfully logged in',
       
        })

   if(!isLogin) {
    if (name === '' || password === '' || phone === '') {
     ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    const res = await axiosInstance.post("/user/register" , {
     name,
     password,
     phone,
    })
 
    const data = res.data;
    if(data.user){
     ToastAndroid.show('User Created', ToastAndroid.SHORT);
     setName('');
     setPassword('');
     setPhone('');
     setIsLogin(true);
    }
    
    
   }
   else{
    if (name === '' || password === '') {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }
    const res = await axiosInstance.post("/user/login" , {
      name , password 
    }) 
    const data = res.data;
    if(data.user){
      ToastAndroid.show('Login Success', ToastAndroid.SHORT);
      setName('');
      setPassword('');
       AsyncStorage.setItem('userId', JSON.stringify(data.user._id));
       // navigation without back
      navigation.replace('Dashboard' , {
        user: data.user,
      })
    }else{
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }
   }
   



 
    }


  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View></View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://photos.wellfound.com/startups/i/9164058-40bc98fa8e854e137e9602af9362d68a-medium_jpg.jpg?buster=1714307188',
          }}
          width={150}
          height={150}
          style={{
            borderRadius: 100,
            marginVertical: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Wellcome to Mealzy{' '}
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              borderRadius: 10,
              padding: 5,
              fontWeight: 'bold',
            }}>
            Health
          </Text>
        </View>
      </View>

      <View
        style={{
          margin: 20,
        }}>
          

        <Text
        
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'green',
          }}>
            {isLogin ? 'Login Into Your Account' : 'Create an Account'}
        </Text>
         

        <TextInput
          placeholder="User Name"
          value={name}
          onChangeText={text => setName(text)}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
            width: 300,
            marginVertical: 10,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
            width: 300,
            marginVertical: 10,
          }}
        />
        {
            !isLogin && (
              <View>
                <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    padding: 10,
                    width: 300,
                    marginVertical: 10,
                }}
                />
                </View>
            )
        }

        <TouchableOpacity
          onPress={()=>{
            handleLogin();
          }}
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              borderRadius: 8,
              padding: 10,
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'center',
              fontSize: 17,
            }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        {isLogin ? (
          <View style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                setIsLogin(false);
              }}>
              <Text
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
            <View style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
                <Text>Do you have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsLogin(true);
                  }}>
                  <Text
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                    }}>
                   Log In
                  </Text>
                </TouchableOpacity>
              </View>
        )}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
