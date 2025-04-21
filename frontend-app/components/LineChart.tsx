import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-gifted-charts";
const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];  
const LineCharts = ({linedata}) => {
  return (
    <View>
 <LineChart
        data={linedata}
        color={'green'}
        thickness={3}
        dataPointsColor={'green'}
      />
    </View>
  )
}

export default LineCharts

const styles = StyleSheet.create({})