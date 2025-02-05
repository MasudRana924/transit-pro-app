import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TransitProHeader = ({ 
  title = 'TransitPro',
  showNotification = true,
  onNotificationPress,
  style 
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1a237e"
        translucent={true}
      />
      <LinearGradient
        colors={['#1a237e', '#3949ab']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerContainer, style]}
      >
        <View style={styles.headerContent}>
          {/* Middle Section (Left Aligned) */}
          <View style={styles.middleSection}>
            <MaterialIcons name="directions-bus" size={24} color="white" style={styles.logo} />
            <Text style={styles.headerTitle}>{title}</Text>
          </View>

          {/* Right Section (Right Aligned) */}
          {showNotification && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.iconButton}
            >
              <MaterialIcons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ebebe8',
  },
  headerContainer: {
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingTop:10
  },
  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});

export default TransitProHeader;
