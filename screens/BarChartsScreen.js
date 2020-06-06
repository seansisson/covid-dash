import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit'

export default function BarChartsScreen() {
  // Create state parameters for data parameters
  // Also create constants for API URL and headers, etc
  const [us, setUs] = useState(0);
  const [br, setBr] = useState(0);
  const [ru, setRu] = useState(0);
  const [mx, setMx] = useState(0);
  const [ca, setCa] = useState(0);
  const url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total";
  const options = {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": ""
    }
  }

  // Call API and set state parameters with appropriate data
  fetch(url.concat('?country=USA'), options)
  .then(response => response.json())
  .then(responseJson => {
    setUs(responseJson['data'].confirmed);
  });
  fetch(url.concat('?country=Brazil'), options)
  .then(response => response.json())
  .then(responseJson => {
    setBr(responseJson['data'].confirmed);
  });
  fetch(url.concat('?country=Russia'), options)
  .then(response => response.json())
  .then(responseJson => {
    setRu(responseJson['data'].confirmed);
  });
  fetch(url.concat('?country=Mexico'), options)
  .then(response => response.json())
  .then(responseJson => {
    setMx(responseJson['data'].confirmed);
  });
  fetch(url.concat('?country=Canada'), options)
  .then(response => response.json())
  .then(responseJson => {
    setCa(responseJson['data'].confirmed);
  });
  var barData = {
    labels: ['USA', 'Brasil', 'Russia', 'Mexico', 'Canada'],
    datasets: [
      {
        data: [us, br, ru, mx, ca],
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.mainText}>
         Coronavirus cases by country
      </Text>
      <BarChart
        // style={graphStyle}
        data={barData}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel={'Confirmed Cases'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  mainText: {
    textAlign: "center",
    backgroundColor: '#fafafa',
    padding: '1em',
    fontSize: 30,
  },
});
