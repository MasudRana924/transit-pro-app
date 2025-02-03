import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Book Bus Tickets Instantly',
    description: 'Find and book bus tickets for any destination in just a few taps. Compare prices and choose the best option for your journey.',
    icon: 'bus',
    color: '#3B82F6',
    bgColor: '#DBEAFE'
  },
  {
    title: 'Easy Scheduling',
    description: 'Plan your trips ahead with our simple scheduling system. Get reminders and real-time updates about your journey.',
    icon: 'calendar',
    color: '#10B981',
    bgColor: '#D1FAE5'
  },
  {
    title: 'Secure Payments',
    description: 'Pay securely using your preferred payment method. Get instant confirmation and digital tickets right on your phone.',
    icon: 'credit-card',
    color: '#8B5CF6',
    bgColor: '#EDE9FE'
  },
  {
    title: 'Safe Travel Guaranteed',
    description: 'Travel with confidence knowing that all our partner buses follow strict safety protocols and regular sanitization.',
    icon: 'shield-check',
    color: '#6366F1',
    bgColor: '#E0E7FF'
  }
];

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = new Animated.Value(0);
  const navigation = useNavigation(); // Use navigation hook

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      Animated.spring(translateX, {
        toValue: -(currentSlide + 1) * width,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${((currentSlide + 1) / slides.length) * 100}%` }]} />
      </View>

      {/* Skip Button */}
      {currentSlide < slides.length - 1 && (
        <TouchableOpacity onPress={() => setCurrentSlide(slides.length - 1)} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slide Content */}
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.imageContainer, { backgroundColor: slides[currentSlide].bgColor }]}>
          <MaterialCommunityIcons name={slides[currentSlide].icon} size={80} color={slides[currentSlide].color} />
        </Animated.View>
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>{slides[currentSlide].description}</Text>
      </View>

      {/* Dots Navigation */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, currentSlide === index && styles.activeDot]} />
        ))}
      </View>

      {/* Next / Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={
          currentSlide === slides.length - 1
            ? () => navigation.navigate('Login') // Navigate to LoginScreen
            : nextSlide
        }>
        <Text style={styles.buttonText}>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // progressBarContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: 4,
  //   backgroundColor: '#E5E7EB',
  // },
  // progressBar: {
  //   height: '100%',
  //   backgroundColor: '#3B82F6',
  // },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  skipText: {
    color: '#6B7280',
    fontSize: 14,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#3B82F6',
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
