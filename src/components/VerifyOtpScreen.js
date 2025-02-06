import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const VerifyOtpScreen = () => {
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };
    const [otpString, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            // setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        const newEndTime = new Date(new Date().getTime() + 60 * 1000);
        localStorage.setItem("otpEndTime", newEndTime);
        setTimer(60);
        //  setCanResend(false);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const otp = otpString.join("");
        if (otp) {
            // dispatch(verifyOTP({ email, otp }));
        }
    };

    const isOtpComplete = otpString.every((digit) => digit !== "");

    return (
        <View style={styles.container}>
            <Icon name="arrow-back" style={styles.arrowIcon} onPress={handleGoBack} />
            <Text style={styles.title}>Verify</Text>
            <Text style={styles.subTitle}>We have sent verification code in your Email</Text>
            <View style={styles.inputContainer}>
                {otpString.map((digit, index) => (
                    <TextInput
                        key={index}
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleChange(index, value)}
                        placeholderTextColor="blue"
                        keyboardType="numeric"
                        style={[
                            styles.input,
                            digit ? styles.inputFilled : styles.inputEmpty,
                        ]}
                        ref={(ref) => inputRefs.current[index] = ref}
                    />
                ))}
            </View>

            <Pressable
                style={[styles.button, isOtpComplete ? styles.buttonActive : styles.buttonInactive]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Verify</Text>
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
        fontWeight: 'semibold',
        textAlign: 'start',
        marginBottom: 5,
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
        color: 'gray',
        backgroundColor: 'white',
    },
    inputEmpty: {
        borderColor: 'gray',
    },
    inputFilled: {
        borderColor: '#ff2511',
        color: '#3a86ff',
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