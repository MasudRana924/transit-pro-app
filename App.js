// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import HomeScreen from './src/components/HomeScreen';
// import InboxScreen from './src/components/InboxScreen';
// import SettingsScreen from './src/components/SettingsScreen';
// import BusSeatSelector from './src/components/BusSeatSelector';
// import BusResultsScreen from './src/components/BusResultsScreen';
// import LoginScreen from './src/components/LoginScreen';
// import PaymentSelectionScreen from './src/components/PaymentSelectionScreen';
// import BookingHistoryScreen from './src/components/BookingHistoryScreen';
// import VerifyOtpScreen from './src/components/VerifyOtpScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Bottom Tab Navigator
// const HomeTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Inbox') {
//             iconName = focused ? 'mail' : 'mail-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#ff2511',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Inbox" component={InboxScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// };

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('@authToken'); // Ensure key matches
//         setIsAuthenticated(!!token);
//         console.log('Auth status checked, isAuthenticated:', !!token); // Debugging log
//       } catch (error) {
//         console.error('Error checking auth status:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);
//   return (
//     <NavigationContainer style={styles.container}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//          <Stack.Screen name="Main" component={HomeTabs} />
//         <Stack.Screen name="Results" component={BusResultsScreen} />
//         <Stack.Screen name="Seats" component={BusSeatSelector} />
//         <Stack.Screen name="Payment" component={PaymentSelectionScreen} />
//         <Stack.Screen name="History" component={BookingHistoryScreen} />
//         <Stack.Screen name="VerifyOTP" component={VerifyOtpScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
// });
// App.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'; // Import store and persistor
import HomeScreen from './src/components/HomeScreen';
import InboxScreen from './src/components/InboxScreen';
import SettingsScreen from './src/components/SettingsScreen';
import BusSeatSelector from './src/components/BusSeatSelector';
import BusResultsScreen from './src/components/BusResultsScreen';
import LoginScreen from './src/components/LoginScreen';
import PaymentSelectionScreen from './src/components/PaymentSelectionScreen';
import BookingHistoryScreen from './src/components/BookingHistoryScreen';
import VerifyOtpScreen from './src/components/VerifyOtpScreen';
import RegisterScreen from './src/components/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const { userData } = useSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('@authToken');
        setIsAuthenticated(!!token);
        console.log('Auth status checked, isAuthenticated:', !!token);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userData ? (
          <>
            <Stack.Screen name="Main" component={HomeTabs} />
            <Stack.Screen name="Results" component={BusResultsScreen} />
            <Stack.Screen name="Seats" component={BusSeatSelector} />
            <Stack.Screen name="Payment" component={PaymentSelectionScreen} />
            <Stack.Screen name="History" component={BookingHistoryScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOtpScreen} />
            <Stack.Screen name="Signup" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AppWrapper;