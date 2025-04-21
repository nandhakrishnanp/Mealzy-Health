import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PhotoFile,
} from 'react-native-vision-camera';
import axiosInstance from '../../axiosInstance';
import {set} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ca } from 'date-fns/locale';

const CameraPage = ({navigation}: any) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [Calorie, setCalorie] = useState(null);
  const [status, setStatus] = useState('Tell Me the Calories');
  // sample calorie object

  //   {
  //     "Total Calories": 650,
  //     "macros": {
  //         "protein": 20,
  //         "carbohydrates": 80,
  //         "fat": 30
  //     },
  //     "ingredients": {
  //         "Dosa": 400,
  //         "Sambar": 100,
  //         "Tomato Chutney": 50,
  //         "Mint-Coriander Chutney": 50,
  //         "Coconut Chutney": 50
  //     }
  // }
  const Cloudurl = 'https://api.cloudinary.com/v1_1/dftwre0on/image/upload';

  // const user = AsyncStorage.getItem('user');
  // // console.log('user', user);
  //  const user =  AsyncStorage.getItem('userId');
  // // const userId = JSON.parse(user);
  //  console.log('userId', JSON.parse(user));
  
  const userId = "6803c728cfb212a507e861d9"

  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const takePhoto = async () => {
    if (cameraRef.current == null) return;
    try {
      const photo: PhotoFile = await cameraRef.current.takePhoto({});
      console.log('Photo captured:', photo);
      setPhoto(photo);
      setShowCamera(false);
      // Add navigation or upload logic here
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleImgToCloud = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      name: `image${Date.now()}`,
      type: 'image/jpg',
      uri: uri,
    });
    formData.append('upload_preset', 'User_imges');
    formData.append('cloud_name', 'dftwre0on');
    try {
      const Cloudresponse = await fetch(Cloudurl, {
        method: 'post',
        body: formData,
      });
      const res = await Cloudresponse.json();
      console.log('Cloudresponse', res);
      const url = res.url;
      return url;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  };

  const handleUpload = async () => {
    if (photo) {
      setStatus('Uploading...');
      const uri = `file://${photo.path}`;
      const cloudUrl = await handleImgToCloud(uri);
      console.log('Cloud URL:', cloudUrl);
      setStatus('Fetching Calories...');
      const user = await AsyncStorage.getItem('userId');
      const res = await axiosInstance.post('/api/calorie', {
        url: cloudUrl,
        userId: JSON.parse(user),
      });
      setStatus('Completed');
      const data = res.data;
      setCalorie(JSON.parse(data));
      console.log('Calorie:', JSON.parse(data));
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <Pressable
          onPress={() => requestPermission()}
          style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Enable Camera Access</Text>
        </Pressable>
      </View>
    );
  }

  if (!device) {
    return <Text>Device not found</Text>;
  }

  return (
    <View style={styles.container}>
      {!showCamera && !photo ? (
        <>
          <Image
            source={{
              uri: 'https://icons.veryicon.com/png/o/miscellaneous/new-version-of-star-selected-icon/scan-28.png',
            }}
            style={{width: 150, height: 150}}
          />
          <Text style={styles.title}>Know Your Calories</Text>

          <TouchableOpacity onPress={() => setShowCamera(true)}>
            <Text style={styles.captureText}>Open Camera</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {photo && (
            <View>
              <Image
                source={{uri: `file://${photo.path}`}}
                width={200}
                height={200}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />

              {Calorie && (
                <View>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Total Calories: {Calorie['total_calories']} cal
                  </Text>
                  <Text
                    style={{fontSize: 18, marginTop: 10, fontWeight: 'bold'}}>
                    Macros:
                  </Text>
                  <Text>Protein: {Calorie['macros']['protein']} g</Text>
                  <Text>
                    Carbohydrates: {Calorie['macros']['carbohydrates']} g
                  </Text>
                  <Text>Fat: {Calorie['macros']['fat']} g</Text>
                  <Text
                    style={{fontSize: 18, marginTop: 10, fontWeight: 'bold'}}>
                    Ingredients:
                  </Text>
                  {Calorie.ingredients.map((item: any, index: number) => (
                    <Text key={index} style={{fontSize: 16, marginTop: 5}}>
                      {item.name}: {item.calories} Cal
                    </Text>
                  ))}
                </View>
              )}
              
              {
                !Calorie && (
                  <TouchableOpacity
                  onPress={() => {
                    handleUpload();
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: 10,
                      padding: 10,
                      fontWeight: 'bold',
                      marginTop: 20,
                      zIndex: 10,
                      textAlign: 'center',
                    }}>
                    {status}
                  </Text>
                </TouchableOpacity>
                )
              }
             

              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                  setCalorie(null);
                  setStatus('Tell Me the Calories');
                }}>
                <Text style={styles.captureText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          )}
          {!photo && (
            <>
              <Camera
                ref={cameraRef}
                style={styles.fullScreenCamera}
                device={device}
                isActive={true}
                photo={true}
              />

              <TouchableOpacity
                onPress={() => {
                  takePhoto();
                }}
                style={styles.captureButtonOverlay}>
                <Text style={styles.captureText}>Capture Image</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  fullScreenCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 0,
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionContainer: {
    backgroundColor: 'green',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  permissionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  permissionButton: {
    padding: 10,
    margin: 20,
    backgroundColor: 'white',
  },
  permissionButtonText: {
    color: 'green',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  captureText: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    fontWeight: 'bold',
    marginTop: 20,
    zIndex: 10,
    textAlign: 'center',
  },
  captureButtonOverlay: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 10,
  },
});
