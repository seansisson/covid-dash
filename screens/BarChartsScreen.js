import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit'

export default function BarChartsScreen() {
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
      "x-rapidapi-key": "3b453fb35emsh676135407fb80d9p153acajsn966cdc2afb9a"
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
  var barData = {
    labels: ['Recovered', 'Confirmed', 'Deaths'],
    datasets: [
      {
        data: [recovered, confirmed, deaths],
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>
         Chart
      </Text>
      <BarChart
        // style={graphStyle}
        data={barData}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel={'# of Infected'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
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
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
