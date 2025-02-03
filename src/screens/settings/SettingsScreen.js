import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const renderToggle = (state, onToggle) => (
    <TouchableOpacity 
      style={[styles.toggle, state ? styles.toggleActive : styles.toggleInactive]}
      onPress={onToggle}
    >
      <View style={[styles.toggleCircle, state && styles.toggleCircleActive]} />
    </TouchableOpacity>
  );

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
            {renderToggle(notifications, () => setNotifications(!notifications))}
          </View>

          {/* Network Settings */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="wifi" size={20} color="#4B5563" />
              <Text style={styles.settingText}>Network Settings</Text>
            </View>
            <FeatherIcon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Security */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          {/* Password */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FeatherIcon name="shield" size={20} color="#4B5563" />
              <View>
                <Text style={styles.settingText}>Password</Text>
                <Text style={styles.settingSubtext}>Last changed 3 months ago</Text>
              </View>
            </View>
            <FeatherIcon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Sign Out */}
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
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
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
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
    borderRadius: 16,
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
  settingSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
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