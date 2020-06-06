import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit'

export default function PieChartsScreen() {
  // Create state parameters for data parameters
  // Also create constants for API URL and headers, etc
  const [recovered, setRecovered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [deaths, setDeaths] = useState(0);
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
    setRecovered(responseJson['data'].recovered);
    setConfirmed(responseJson['data'].confirmed);
    setDeaths(responseJson['data'].deaths);
  });

  // Initialize final pie chart data
  var pieData = [
    {
      name: 'Recovered',
      population: recovered,
      color: 'green',
    },
    {
      name: 'Confirmed',
      population: confirmed,
      color: 'Orange',
    },
    {
      name: 'Deaths',
      population: deaths,
      color: 'red',
    },
  ];

  // Return a scrollable pi chart with supplied pie chart data (pieData)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.mainText}>
         Coronavirus cases by country
      </Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width}
        height={220}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        absolute
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
