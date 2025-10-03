import './global.css';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';

// Define the type for our stack navigator
export type RootStackParamList = {
  Home: undefined;
  EventDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Events Around',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

           <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{
              title: 'Event Details',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
