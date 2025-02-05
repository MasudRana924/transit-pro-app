import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/components/HomeScreen';
import InboxScreen from './src/components/InboxScreen';
import SettingsScreen from './src/components/SettingsScreen';
import OnboardingScreen from './src/components/OnboardingScreen';
import BusSeatSelector from './src/components/BusSeatSelector';
import BusResultsScreen from './src/components/BusResultsScreen';
import LoginScreen from './src/components/LoginScreen';

import PaymentSelectionScreen from './src/components/PaymentSelectionScreen';
import BookingHistoryScreen from './src/components/BookingHistoryScreen';
import RegisterScreen from './src/components/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff2511',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkOnboardingAndLoginStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('@isFirstLaunch');
        const token = await AsyncStorage.getItem('@auth_token');
  
        if (onboardingStatus === null) {
          await AsyncStorage.setItem('@isFirstLaunch', JSON.stringify(false));
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
  
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error checking onboarding or login status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboardingAndLoginStatus();
  }, []);
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : null}
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={HomeTabs} />
            <Stack.Screen name="Results" component={BusResultsScreen} />
            <Stack.Screen name="Seats" component={BusSeatSelector} />
            <Stack.Screen name="Payment" component={PaymentSelectionScreen} />
            <Stack.Screen name="History" component={BookingHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
