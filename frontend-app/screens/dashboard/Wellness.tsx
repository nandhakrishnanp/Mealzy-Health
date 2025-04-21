import { Image, StyleSheet, Text, View } from 'react-native'

const Wellness = () => {
  return (
    <View style={{
       justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }} >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }} >
      <Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/256/8722/8722283.png',
        width: 50,
        height: 50,
      }}
      />
         <Text style={{
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
      
      }} >2</Text>
      </View>
    
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
      
      }} >Current Streak</Text>
 
 <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
        backgroundColor:"#67AE6E",
        color: "white",
        padding: 10,
        borderRadius: 10,
      }} > Best Streak : 2</Text>

    </View>
  )
}

export default Wellness

const styles = StyleSheet.create({})