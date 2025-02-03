import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fromDivision, setFromDivision] = useState('');
  const [toDivision, setToDivision] = useState('');
  const [date, setDate] = useState('');

  const bangladeshiDivisions = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 
    'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh'
  ];

  const handleLogin = () => {
    navigation.navigate('Results');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.searchCard}>
          <Text style={styles.title}>Find Your Perfect Bus Journey</Text>

          <View style={styles.inputContainer}>
            {/* From Location */}
            <Text style={styles.label}>From</Text>
            <View style={styles.inputWrapper}>
              <Icon name="map-pin" size={20} color="#3B82F6" style={styles.inputIcon} />
              <TextInput
                value={fromDivision}
                onChangeText={setFromDivision}
                placeholder="Enter departure division"
                style={styles.input}
              />
            </View>

            {/* To Location */}
            <Text style={styles.label}>To</Text>
            <View style={styles.inputWrapper}>
              <Icon name="map-pin" size={20} color="#3B82F6" style={styles.inputIcon} />
              <TextInput
                value={toDivision}
                onChangeText={setToDivision}
                placeholder="Enter destination division"
                style={styles.input}
              />
            </View>

            {/* Date Selection */}
            <Text style={styles.label}>Date of Journey</Text>
            <View style={styles.inputWrapper}>
              <Icon name="calendar" size={20} color="#3B82F6" style={styles.inputIcon} />
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="Select date"
                style={styles.input}
              />
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleLogin}>
              <Icon name="search" size={20} color="white" />
              <Text style={styles.searchButtonText}>Search Buses</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Routes Section */}
        <View style={styles.popularRoutesSection}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <View style={styles.popularRoutesContainer}>
            {bangladeshiDivisions.map((division, index) => (
              <TouchableOpacity key={index} style={styles.routeButton}>
                <View style={styles.routeButtonContent}>
                  <MaterialIcon name="directions-bus" size={20} color="#3B82F6" />
                  <Text style={styles.routeButtonText}>{division}</Text>
                </View>
                <Icon name="arrow-right" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={[styles.infoCard, styles.safetyCard]}>
            <Text style={styles.infoCardTitle}>Safe Travel</Text>
            <Text style={styles.infoCardText}>Enhanced safety measures</Text>
          </View>
          <View style={[styles.infoCard, styles.cancellationCard]}>
            <Text style={styles.infoCardTitle}>Free Cancellation</Text>
            <Text style={styles.infoCardText}>On selected tickets</Text>
          </View>
          <View style={[styles.infoCard, styles.refundCard]}>
            <Text style={styles.infoCardTitle}>Instant Refund</Text>
            <Text style={styles.infoCardText}>Fast & secure returns</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop:25
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  searchCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 16,
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    paddingRight: 12,
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  searchButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  popularRoutesSection: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  popularRoutesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  routeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    marginBottom: 8,
  },
  routeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 10,
  },
  infoCard: {
    width: '32%',
    padding: 12,
    borderRadius: 12,
  },
  safetyCard: {
    backgroundColor: '#D1FAE5',
    borderColor: '#6EE7B7',
  },
  cancellationCard: {
    backgroundColor: '#DBEAFE',
    borderColor: '#93C5FD',
  },
  refundCard: {
    backgroundColor: '#EDE9FE',
    borderColor: '#C4B5FD',
  },
  infoCardTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 12,
  },
});

export default HomeScreen;