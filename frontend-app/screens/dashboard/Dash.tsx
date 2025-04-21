import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {use, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
import {useIsFocused} from '@react-navigation/native';
import LineCharts from '../../components/LineChart';

const Dash = () => {
  const [userId, setUserId] = React.useState(null);
  const [todayCalorie, setTodayCalorie] = React.useState(null);
  const [todayProtein, setTodayProtein] = React.useState(null);
  const [todayFat, setTodayFat] = React.useState(null);
  const [recentMeals, setRecentMeals] = React.useState(null);
  const [CaloriData, setCaloriData] = React.useState<any>([]);
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('userId');
    console.log('user', JSON.parse(user));
    setUserId(JSON.parse(user));
    fetchRecentMeals();
  };

  const fetchRecentMeals = async () => {
    const user = await AsyncStorage.getItem('userId');
    const res = await axiosInstance.get(`/meal/${JSON.parse(user)}`);

    console.log('res', res.data);
    const data = res.data;
    // reverse the array
    setRecentMeals(res.data.meals);

 
    let total_calories_sum = 0;
    let protein_sum = 0;
    let fat_sum = 0;
    let d =[];
    data.meals.map((item: any) => {
      d.push({
        value: item.total_calories,
      })
      setCaloriData(d);
      total_calories_sum += item.total_calories;
      protein_sum += item.macros.protein;
      fat_sum += item.macros.fat;
    });
    
    setTodayCalorie(total_calories_sum);
    setTodayProtein(protein_sum);
    setTodayFat(fat_sum);
  };

  const isFocus = useIsFocused();

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    getUserId();
  }, [isFocus]);

  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
        }}>
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
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}>
        <View
          style={{
            backgroundColor: 'green',
            padding: 20,
            borderRadius: 10,
            marginVertical: 10,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {' '}
            Today Calorie Intake
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginVertical: 10,
            }}>
            {' '}
            {todayCalorie} CAL
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            padding: 20,
            borderRadius: 10,
            marginVertical: 10,
            height: 150,
            marginLeft: 10,
            width: 150,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Today Protein
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                marginVertical: 8,
              }}>
              {' '}
              {todayProtein} Grams
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Today Fat
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                marginVertical: 8,
              }}>
              {' '}
              {todayFat} Grams
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Smart Sugestion
        </Text>

        <Text
          style={{
            padding: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          You are Going in the right direction, keep it up
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Recent Meals
        </Text>
        {/* {
    "macros": {
        "protein": 20,
        "carbohydrates": 100,
        "fat": 30
    },
    "_id": "6803d4427a1281a866548c61",
    "userId": "6803c728cfb212a507e861d9",
    "mealUrl": "http://res.cloudinary.com/dftwre0on/image/upload/v1745081400/mk7hzfi5h35f95958txm.jpg",
    "total_calories": 750,
    "ingredients": [
        {
            "name": "Dosa",
            "calories": 500,
            "_id": "6803d4427a1281a866548c62"
        },
        {
            "name": "Sambar",
            "calories": 100,
            "_id": "6803d4427a1281a866548c63"
        },
        {
            "name": "Tomato Chutney",
            "calories": 50,
            "_id": "6803d4427a1281a866548c64"
        },
        {
            "name": "Mint Chutney",
            "calories": 50,
            "_id": "6803d4427a1281a866548c65"
        },
        {
            "name": "Coconut Chutney",
            "calories": 50,
            "_id": "6803d4427a1281a866548c66"
        }
    ],
    "createdAt": "2025-04-19T16:50:10.331Z",
    "updatedAt": "2025-04-19T16:50:10.331Z",
    "__v": 0
} */}

        <View
          style={{
            backgroundColor: '',
            padding: 1,
            gap: 2,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          {recentMeals &&
            recentMeals.map((item: any) => {
              return (
                <View
                  key={item._id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    backgroundColor: 'white',
                    padding: 10,
                  }}>
                  <Image
                    source={{uri: item.mealUrl}}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.total_calories} KCAL
                    </Text>
                    <Text>{item.createdAt}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </View>

      <View style={{
        marginHorizontal: 10,
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginHorizontal: 10,
          marginBottom: 10,
        }} >Your Calorie Trend</Text>
        {
          CaloriData.length > 0 &&
          <LineCharts linedata={CaloriData} />
        }
        
      </View>
    </ScrollView>
  );
};

export default Dash;

const styles = StyleSheet.create({});
