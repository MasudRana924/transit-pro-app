import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AnimatedBanner = () => {
  // Animation values
  const busPosition = useRef(new Animated.Value(-200)).current;
  const cloudPosition1 = useRef(new Animated.Value(0)).current;
  const cloudPosition2 = useRef(new Animated.Value(width)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate bus entry
    Animated.timing(busPosition, {
      toValue: 20,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    // Animate clouds
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(cloudPosition1, {
            toValue: -width,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(cloudPosition1, {
            toValue: width,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(cloudPosition2, {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(cloudPosition2, {
            toValue: width * 2,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in text
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.background}
      >
        {/* Animated Clouds */}
        <Animated.View
          style={[styles.cloud, { transform: [{ translateX: cloudPosition1 }] }]}
        >
          <MaterialIcons name="cloud" size={40} color="rgba(255,255,255,0.8)" />
        </Animated.View>
        <Animated.View
          style={[styles.cloud, { transform: [{ translateX: cloudPosition2 }] }]}
        >
          <MaterialIcons name="cloud" size={30} color="rgba(255,255,255,0.6)" />
        </Animated.View>

        {/* Animated Bus */}
        <Animated.View
          style={[
            styles.busContainer,
            {
              transform: [
                { translateX: busPosition },
                { translateY: bounce },
              ],
            },
          ]}
        >
          <MaterialIcons name="directions-bus" size={60} color="white" />
        </Animated.View>

        {/* Animated Text */}
        <Animated.View style={[styles.textContainer, { opacity: fade }]}>
          <Text style={styles.title}>Welcome to TransitPro</Text>
          <Text style={styles.subtitle}>Your Journey Begins Here</Text>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Your Ticket</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Road */}
        <View style={styles.road}>
          <View style={styles.roadLine} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cloud: {
    position: 'absolute',
    top: 20,
  },
  busContainer: {
    position: 'absolute',
    bottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  road: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#455A64',
  },
  roadLine: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default AnimatedBanner;