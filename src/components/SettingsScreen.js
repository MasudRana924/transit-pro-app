import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [paymentMethod, setPaymentMethod] = useState('bKash');

  const renderToggle = (state, onToggle) => (
    <TouchableOpacity
      style={[
        styles.toggle,
        state ? styles.toggleActive : styles.toggleInactive,
      ]}
      onPress={onToggle}>
      <View style={[styles.toggleCircle, state && styles.toggleCircleActive]} />
    </TouchableOpacity>
  );
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@auth_token');
      navigation.navigate('Login'); // Navigate back to the login screen
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileIconWrapper}>
            <FeatherIcon name="user" size={32} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('History')}>
            <View style={styles.settingItemLeft}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#333" />
              <Text style={styles.settingText}>Booking History</Text>
            </View>
          </TouchableOpacity>
          {/* Payment Method */}
          <TouchableOpacity style={styles.settingItem}  onPress={() => navigation.navigate('VerifyOTP')}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="credit-card" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Payment Method</Text>
            </View>
            <Text style={styles.settingValue}>{paymentMethod}</Text>
          </TouchableOpacity>

          

          <TouchableOpacity style={styles.signOutButton} onPress={() => dispatch(logout())}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* Support */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
{/* Dark Mode */}
<View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="moon" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            {renderToggle(darkMode, () => setDarkMode(!darkMode))}
          </View>

          {/* Notifications */}
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="bell" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            {renderToggle(notifications, () =>
              setNotifications(!notifications)
            )}
          </View>

          {/* Language Selection */}
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="globe" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Language</Text>
            </View>
            <Text style={styles.settingValue}>{language}</Text>
          </View>
          {/* Help Center */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <MaterialIcon name="help-outline" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Help Center</Text>
            </View>
            <FeatherIcon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Contact Support */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <MaterialIcon name="support-agent" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <FeatherIcon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    // paddingTop: 30,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileIconWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#3B82F6',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    color: '#6B7280',
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: '#111827',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4B5563',
  },
  settingValue: {
    fontSize: 16,
    color: '#111827',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleInactive: {
    backgroundColor: '#E5E7EB',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    left: 2,
  },
  toggleCircleActive: {
    transform: [{ translateX: 20 }],
  },
  signOutButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;
