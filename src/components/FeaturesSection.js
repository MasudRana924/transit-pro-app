import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FeaturesSection = () => {
  const features = [
    {
      id: '1',
      title: 'Live Tracking',
      icon: 'location-on',
      color: '#FF6B6B',
      description: 'Track your bus location in real-time'
    },
    {
      id: '2',
      title: 'Seat Preview',
      icon: 'event-seat',
      color: '#4ECDC4',
      description: 'Virtual seat layout with 360° view'
    },
    {
      id: '3',
      title: 'Smart Compare',
      icon: 'compare-arrows',
      color: '#45B7D1',
      description: 'Compare prices and amenities'
    },
    {
      id: '4',
      title: 'Instant Refund',
      icon: 'account-balance-wallet',
      color: '#96CEB4',
      description: 'Hassle-free cancellation & refunds'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Features</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {features.map((feature) => (
          <TouchableOpacity 
            key={feature.id} 
            style={styles.card}
            onPress={() => {}}
          >
            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
              <MaterialIcons name={feature.icon} size={28} color="white" />
            </View>
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.description}>{feature.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3436',
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2d3436',
  },
  description: {
    fontSize: 12,
    color: '#636e72',
    lineHeight: 18,
  },
});

export default FeaturesSection;