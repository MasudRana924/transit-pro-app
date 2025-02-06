import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailAnimation = new Animated.Value(0);
  const passwordAnimation = new Animated.Value(0);

  const animateInput = (animation, toValue) => {
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
  };

  const handleFocus = (field, animation) => {
    if (field === 'email') setEmailFocused(true);
    if (field === 'password') setPasswordFocused(true);
    animateInput(animation, 1);
  };

  const handleBlur = (field, animation) => {
    if (field === 'email') setEmailFocused(false);
    if (field === 'password') setPasswordFocused(false);
    animateInput(animation, 0);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Registration logic here
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputBorderColor = (focused) => 
    focused ? '#ff2511' : '#E0E0E0';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Animated.View style={styles.logoContainer}>
            <MaterialIcons name="directions-bus" size={60} color="#ff2511" />
          </Animated.View>
          <Text style={styles.headerTitle}>TransitPro</Text>
          <Text style={styles.headerSubtitle}>Create an Account</Text>
        </View>

        <View style={styles.formContainer}>
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor(emailFocused),
                transform: [{
                  scale: emailAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.02],
                  }),
                }],
              },
            ]}
          >
            <MaterialIcons
              name="email"
              size={22}
              color={emailFocused ? '#ff2511' : '#666'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, emailFocused && styles.focusedInput]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => handleFocus('email', emailAnimation)}
              onBlur={() => handleBlur('email', emailAnimation)}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor(passwordFocused),
                transform: [{
                  scale: passwordAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.02],
                  }),
                }],
              },
            ]}
          >
            <MaterialIcons
              name="lock"
              size={22}
              color={passwordFocused ? '#ff2511' : '#666'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, passwordFocused && styles.focusedInput]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => handleFocus('password', passwordAnimation)}
              onBlur={() => handleBlur('password', passwordAnimation)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color={passwordFocused ? '#ff2511' : '#666'}
              />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonLoading]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={styles.loaderContainer}>
                <Text style={styles.loaderText}>Creating account</Text>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or register with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
            >
              <MaterialIcons name="facebook" size={26} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="google" size={26} color="#DB4437" />
            </TouchableOpacity>
          </View>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 37, 17, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666666',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  formContainer: {
    width: '88%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    height: 55,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    letterSpacing: 0.3,
  },
  focusedInput: {
    color: '#ff2511',
  },
  passwordToggle: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: '#ff2511',
    borderRadius: 4,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    // shadowColor: '#ff2511',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 5,
  },
  registerButtonLoading: {
    backgroundColor: '#ff251199',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666666',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signInText: {
    color: '#666666',
    fontSize: 15,
  },
  signInLink: {
    color: '#ff2511',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RegisterScreen;