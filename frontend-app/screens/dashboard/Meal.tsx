import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import axiosInstance from '../../axiosInstance';

const Meal = () => {
  const [isGenerated, setIsGenerated] = React.useState(false);
  const [receipe,setReceipe] = React.useState('');
   const [generatedReceipe,setGeneratedReceipe] = React.useState(null);
   const [status , setStatus] = React.useState("Check");
  const [isGenreating, setIsGenreating] = React.useState(false);
  const handleGenerate = async() => {
    try {
      
     setIsGenerated(true);
      setIsGenreating(true);
       const res = await axiosInstance.post("/api/recipe" ,{
        prompt: receipe,
       })

        const data = res.data;
        //console.log(data);
       setGeneratedReceipe(JSON.parse(data)[0]);
       console.log(JSON.parse(data)[0]);
        setIsGenreating(false);
    } catch (error) {
      console.log(error);
      
    }
  };

  const reset = () => {
    setIsGenerated(false);
    setReceipe('');
    setGeneratedReceipe(null);
  }
  

// example of generated receipe
// {
//   "recipe_name": "Healthy Curd Rice",
//   "ingredients": [
//       "1 cup cooked brown rice, cooled",
//       "1 cup plain nonfat Greek yogurt",
//       "1/4 cup milk (can be dairy or non-dairy)",
//       "1 tablespoon chopped fresh cilantro",
//       "1/2 teaspoon mustard seeds",
//       "1/2 teaspoon urad dal (split black gram)",
//       "1/4 teaspoon asafetida (hing)",
//       "1-2 green chilies, finely chopped (optional)",
//       "1 teaspoon olive oil or avocado oil",
//       "Salt to taste"
//   ],
//   "instructions": [
//       "Prepare the Rice: Ensure the cooked brown rice is cooled to room temperature.",
//       "Mix Yogurt and Milk: In a bowl, whisk together the nonfat Greek yogurt and milk until smooth. The milk helps thin the yogurt to a desirable consistency.",
//       "Combine Ingredients: Add the cooled rice, chopped cilantro, and salt to the yogurt mixture. Mix well.",
//       "Temper the Spices: Heat the oil in a small pan or skillet over medium heat. Add mustard seeds. Once they start to splutter, add urad dal, asafetida, and chopped green chilies (if using). Sauté for a few seconds until the urad dal turns light golden brown.",
//       "Add Tempering: Pour the tempering over the curd rice. Mix well.",
//       "Serve: Serve the curd rice immediately or chill for a while before serving. Garnish with additional chopped cilantro, if desired."
//   ],
//   "total_macros_breakdown": {
//       "calories": "Approximately 250-300 calories per serving",
//       "protein": "Approximately 15-20g per serving",
//       "carbohydrates": "Approximately 35-40g per serving",
//       "fats": "Approximately 5-8g per serving"
//   }
// }
  return (
    <ScrollView>
      <View
        style={{
          minHeight: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!isGenerated && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image 
               source={{
                uri:"https://images.vexels.com/media/users/3/156610/isolated/preview/aa5e27436f6f22dc229b21f4f152198f-chef-hat-front-flat-icon.png"
               }}
               width={100}
                height={100}
              />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
              }}>
              NutriBot
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                marginTop: 8,
              }}>
            Your AI Bot for smarter, healthier meals.
            </Text>
     
      <View style={{
        alignItems: 'center',
          gap: 10,
      }}>

           <TextInput
            placeholder='Enter your Dish Name'
            style={{
              width: '80%',
              height: 50,
              borderRadius: 10,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              marginTop: 16,
            }}
            value={receipe}
            onChangeText={(text) => setReceipe(text)}
           />
           <TouchableOpacity 
            onPress={()=>
            {
              handleGenerate();
            }
            }
           >
               <Text style={{
                backgroundColor:"green",
                padding: 10,
                borderRadius: 10,
                color: "#fff",
               }} >Generate</Text>
           </TouchableOpacity>
           
</View>
          </View>
        )}

        {isGenreating &&(
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
              }}>
              Generating...
            </Text>
          </View>
        )}

        { generatedReceipe &&(
           
          <View style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 16,
            marginTop: 16,
          }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'green',
              }}>
              {generatedReceipe.recipe_name}
            </Text>
            <TouchableOpacity onPress={()=>
              {
                reset();
              }
            } >
                 <Text>
                   Reset
                 </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                marginTop: 8,
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              Ingredients:
            </Text>
            {generatedReceipe.ingredients && generatedReceipe.ingredients.map((item, index) => (
              <Text key={index} style={{fontSize: 16, color: '#000'
                , marginVertical:4
              }}>
               {index+1} .  {item}
              </Text>
            ))}
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                marginTop: 8,
                fontWeight:"bold",
                marginVertical:4
              }}>
              Instructions:
            </Text>
            {generatedReceipe.instructions && generatedReceipe.instructions.map((item, index) => (
              <Text key={index} style={{fontSize: 16, color: '#000'
                , marginVertical:4
              }}>
               {index+1} . {item}
              </Text>
            ))}
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                marginTop: 8,
                fontWeight:"bold",
                marginVertical:5
              }}>
              Macros Breakdown:
            </Text>
            {generatedReceipe.total_macros_breakdown && (
              <Text style={{fontSize: 16, color: '#000' ,
                marginVertical:5 ,
                fontWeight:"bold"
              }}>
                {`Calories: ${generatedReceipe.total_macros_breakdown.calories}`}
              </Text>
            )}
            {generatedReceipe.total_macros_breakdown && (
              <Text style={{fontSize: 16, color: '#000' ,
                marginVertical:5 ,
                fontWeight:"bold"
              }}>
                {`Protein: ${generatedReceipe.total_macros_breakdown.protein}`}
              </Text>
            )}
            {generatedReceipe.total_macros_breakdown && (
              <Text style={{fontSize: 16, color: '#000' ,
                marginVertical:5 ,
                fontWeight:"bold"
              }}>
                {`Carbohydrates: ${generatedReceipe.total_macros_breakdown.carbohydrates}`}
              </Text>
            )}
            {generatedReceipe.total_macros_breakdown && (
              <Text style={{fontSize: 16, color: '#000' ,
                marginVertical:5 ,
                fontWeight:"bold"
              }}>
                {`Fats: ${generatedReceipe.total_macros_breakdown.fats}`}
              </Text>
            )}
          </View> 

        )}
      </View>
    </ScrollView>
  );
};

export default Meal;

const styles = StyleSheet.create({});
