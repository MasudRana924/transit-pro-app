import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
   const navigation = useNavigation()
  const [currentSlide, setCurrentSlide] = useState(0);
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const busPosition = useRef(new Animated.Value(-width)).current;
  const buildingScale = useRef(new Animated.Value(0)).current;
  const starOpacity = useRef([...Array(5)].map(() => new Animated.Value(0))).current;
  const circleScale = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      title: "Welcome to TransitPro",
      subtitle: "Your Premium Bus Booking Experience",
      icon: "directions-bus"
    },
    {
      title: "Easy Booking",
      subtitle: "Book tickets in just a few taps",
      icon: "confirmation-number"
    },
    {
      title: "Track Your Journey",
      subtitle: "Real-time updates and tracking",
      icon: "location-on"
    }
  ];

  useEffect(() => {
    animateSequence();
  }, [currentSlide]);

  const animateSequence = () => {
    // Reset animations
    fadeAnim.setValue(0);
    busPosition.setValue(-width);
    buildingScale.setValue(0);
    starOpacity.forEach(star => star.setValue(0));
    circleScale.setValue(0);

    // Animated sequence
    Animated.sequence([
      // Fade in background circle
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Animate bus entry
      Animated.parallel([
        Animated.timing(busPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        // Scale buildings
        Animated.timing(buildingScale, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      // Animate stars
      Animated.stagger(200, starOpacity.map(star =>
        Animated.timing(star, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )),
    ]).start();
  };

  const renderStars = () => {
    return starOpacity.map((opacity, index) => (
      <Animated.View
        key={index}
        style={[
          styles.star,
          {
            top: 50 + Math.random() * 100,
            left: (width / 6) * index,
            opacity,
            transform: [{ scale: opacity }],
          },
        ]}
      >
        <MaterialIcons name="star" size={20} color="#FFD700" />
      </Animated.View>
    ));
  };

  const renderDots = () => {
    return slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: currentSlide === index ? '#ff2511' : 'white' },
        ]}
      />
    ));
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#1a237e', '#3949ab', '#7986cb']}
        style={styles.gradient}
      >
        {/* Animated Background Circle */}
        <Animated.View
          style={[
            styles.backgroundCircle,
            {
              transform: [
                {
                  scale: circleScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.5],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Stars Animation */}
        {renderStars()}

        {/* City Buildings Silhouette */}
        <Animated.View
          style={[
            styles.cityscape,
            {
              transform: [{ scaleY: buildingScale }],
              opacity: buildingScale,
            },
          ]}
        />

        {/* Main Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            { opacity: fadeAnim },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={slides[currentSlide].icon}
              size={80}
              color="white"
            />
          </View>

          {/* Text Content */}
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.subtitle}>{slides[currentSlide].subtitle}</Text>
        </Animated.View>

        {/* Bus Animation */}
        <Animated.View
          style={[
            styles.busContainer,
            {
              transform: [{ translateX: busPosition }],
            },
          ]}
        >
          <MaterialIcons name="directions-bus" size={60} color="white" />
        </Animated.View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.dotsContainer}>
            {renderDots()}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
          >
            <LinearGradient
              colors={['#ff2511', '#ff2511']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={24}
                color="white"
                style={styles.buttonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundCircle: {
    position: 'absolute',
    top: -height * 0.2,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  star: {
    position: 'absolute',
  },
  cityscape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.3)',
    maskImage: 'linear-gradient(to bottom, transparent, black)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  busContainer: {
    position: 'absolute',
    bottom: 140,
    paddingHorizontal: 20,
  },
  bottomSection: {
    padding: 20,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default OnboardingScreen;