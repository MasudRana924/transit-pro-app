import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpString, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        const getEmail = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        };
        getEmail();
    }, []);

    const handleChange = (index, value) => {
        if (/^[0-9a-zA-Z]$/.test(value) || value === "") {
            const newOtp = [...otpString];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < otpString.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleSubmit = async () => {
        const otp = otpString.join("");
        if (!email || !otp) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch('https://transitpro-service.onrender.com/api/auth/verifyOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                navigation.navigate('Login');
            } else {
                Alert.alert('Verification Failed', data.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Verification Failed', error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const isOtpComplete = otpString.every((digit) => digit !== "");

    return (
        <View style={styles.container}>
            <Icon name="arrow-back" style={styles.arrowIcon} onPress={() => navigation.goBack()} />
            <Text style={styles.title}>Verify</Text>
            <Text style={styles.subTitle}>
    We have sent a verification code to <Text style={styles.emailText}>{email}</Text>
</Text>

            <View style={styles.inputContainer}>
                {otpString.map((digit, index) => (
                    <TextInput
                        key={index}
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleChange(index, value)}
                        placeholderTextColor="blue"
                        keyboardType="numeric"
                        style={[styles.input, digit ? styles.inputFilled : styles.inputEmpty]}
                        ref={(ref) => inputRefs.current[index] = ref}
                    />
                ))}
            </View>

            <Pressable
                style={[styles.button, isOtpComplete ? styles.buttonActive : styles.buttonInactive]}
                onPress={handleSubmit}
                disabled={isLoading} // Disable button when loading
            >
                {isLoading ? (
                    <>
                        <Text style={styles.buttonText}>Please wait...</Text>
                        <ActivityIndicator color="white" />
                    </>
                ) : (
                    <Text style={styles.buttonText}>Verify</Text>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingTop: 50,
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'start',
    },
    subTitle: {
        fontSize: 10,
        color: '#000000',
        fontWeight: '600',
        textAlign: 'start',
        marginBottom: 5,
    },
    emailText: {
        color: '#ff2511', // Set the email text color to red
        fontWeight: 'bold',
    },
    
    arrowIcon: {
        color: '#ff2511',
        fontSize: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 13,
        marginTop: 20,
        width: '100%',
    },
    input: {
        height: 47,
        width: 47,
        borderWidth: 2,
        borderRadius: 4,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
    },
    inputEmpty: {
        borderColor: 'gray',
    },
    inputFilled: {
        borderColor: '#ff2511',
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 4,
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    buttonInactive: {
        backgroundColor: 'gray',
    },
    buttonActive: {
        backgroundColor: '#ff2511',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default VerifyOtpScreen;
