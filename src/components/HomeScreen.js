import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Animated,
  Easing,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import FeaturesSection from './FeaturesSection';

const CustomLoader = ({ visible }) => {
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.loaderContainer}>
        <View style={styles.loaderContent}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}>
            <MaterialIcons name="directions-bus" size={48} color="#ff2511" />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fromDivision, setFromDivision] = useState('');
  const [toDivision, setToDivision] = useState('');
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const bangladeshiDistricts = [
    'Dhaka',
    'Faridpur',
    'Gazipur',
    'Gopalganj',
    'Kishoreganj',
    'Madaripur',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Narsingdi',
    'Rajbari',
    'Shariatpur',
    'Tangail',
    'Bagerhat',
    'Chuadanga',
    'Jessore',
    'Jhenaidah',
    'Khulna',
    'Kushtia',
    'Magura',
    'Meherpur',
    'Narail',
    'Satkhira',
    'Bogra',
    'Joypurhat',
    'Naogaon',
    'Natore',
    'Chapainawabganj',
    'Pabna',
    'Rajshahi',
    'Sirajganj',
    'Dinajpur',
    'Gaibandha',
    'Kurigram',
    'Lalmonirhat',
    'Nilphamari',
    'Panchagarh',
    'Rangpur',
    'Thakurgaon',
    'Habiganj',
    'Moulvibazar',
    'Sunamganj',
    'Sylhet',
    'Barguna',
    'Barisal',
    'Bhola',
    'Jhalokati',
    'Patuakhali',
    'Pirojpur',
    'Bandarban',
    'Brahmanbaria',
    'Chandpur',
    'Chittagong',
    'Comilla',
    "Cox's Bazar",
    'Feni',
    'Khagrachhari',
    'Lakshmipur',
    'Noakhali',
    'Rangamati',
    'Mymensingh',
    'Netrokona',
    'Jamalpur',
    'Sherpur',
  ];


  const handleLogin = () => {
    if (!fromDivision || !toDivision || !date) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate an API call or navigation delay
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Results');
    }, 2000);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === 'ios');
    setDate(currentDate.toLocaleDateString());
  };

  const handleFromInputChange = (text) => {
    setFromDivision(text);
    if (text.length > 0) {
      const filteredSuggestions = bangladeshiDistricts.filter((district) =>
        district.toLowerCase().includes(text.toLowerCase())
      );
      setFromSuggestions(filteredSuggestions);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToInputChange = (text) => {
    setToDivision(text);
    if (text.length > 0) {
      const filteredSuggestions = bangladeshiDistricts.filter((district) =>
        district.toLowerCase().includes(text.toLowerCase())
      );
      setToSuggestions(filteredSuggestions);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const handleSuggestionPress = (field, suggestion) => {
    if (field === 'from') {
      setFromDivision(suggestion);
      setShowFromSuggestions(false);
    } else if (field === 'to') {
      setToDivision(suggestion);
      setShowToSuggestions(false);
    }
  };

  const renderSuggestionItem = ({ item, field }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(field, item)}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {/* Company Header */}
          <View style={styles.companyHeader}>
            <Image
              source={{
                uri: 'https://imgs.search.brave.com/YXMltTc4uarzRRmZ476Pvc3CW2yh0guPNeGMtxm_ymw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzg4LzgyLzE1/LzM2MF9GXzI4ODgy/MTU3NV9UTTRnSk9N/cE9GZ05IMVFVSURH/emFEUXpNWlNVOTJM/Uy5qcGc',
              }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          </View>

          {/* Search Card */}
          <View style={styles.searchCardContainer}>
            <View style={styles.searchCard}>
              <View style={styles.logoHeader}>
                <View style={styles.logoContainer}>
                  <MaterialIcons name="directions-bus" size={32} color="#ff2511" />
                </View>
                <Text style={styles.companyName}>TransitPro</Text>
              </View>


              <View style={styles.inputContainer}>
                {/* From Location */}
                <Text style={styles.label}>From</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="map-pin"
                    size={20}
                    color="#ff2511"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    value={fromDivision}
                    onChangeText={handleFromInputChange}
                    placeholder="Enter departure district"
                    style={styles.input}
                    onFocus={() => setShowFromSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowFromSuggestions(false), 200)
                    }
                  />
                </View>
                {showFromSuggestions && (
                  <FlatList
                    data={fromSuggestions}
                    renderItem={({ item }) =>
                      renderSuggestionItem({ item, field: 'from' })
                    }
                    keyExtractor={(item) => item}
                    style={styles.suggestionsList}
                  />
                )}

                {/* To Location */}
                <Text style={styles.label}>To</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="map-pin"
                    size={20}
                    color="#ff2511"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    value={toDivision}
                    onChangeText={handleToInputChange}
                    placeholder="Enter destination district"
                    style={styles.input}
                    onFocus={() => setShowToSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowToSuggestions(false), 200)
                    }
                  />
                </View>
                {showToSuggestions && (
                  <FlatList
                    data={toSuggestions}
                    renderItem={({ item }) =>
                      renderSuggestionItem({ item, field: 'to' })
                    }
                    keyExtractor={(item) => item}
                    style={styles.suggestionsList}
                  />
                )}

                {/* Date Selection */}
                <Text style={styles.label}>Date of Journey</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="calendar"
                    size={20}
                    color="#ff2511"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    value={date}
                    onFocus={() => setShowCalendar(true)}
                    placeholder="Select date"
                    style={styles.input}
                  />
                </View>

                {/* {showCalendar && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    accentColor="#ff2511"
                    textColor="#ff2511"
                  />
                )} */}

                {/* Search Button */}
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleLogin}>
                  <Icon name="search" size={20} color="white" />
                  <Text style={styles.searchButtonText}>Search Buses</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <FeaturesSection/>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Loader */}
      <CustomLoader visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: 35,
  },
  container: {
    flex: 1,
  },
  companyHeader: {
    width: '100%',
    height: 350,
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  searchCardContainer: {
    position: 'absolute',
    top: 150, // Adjust this value to control how much of the card overlaps
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 1, // Ensure the card is above the header
  },
  searchCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 4,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff2511',
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
    borderRadius: 4,
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
  suggestionsList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  suggestionText: {
    fontSize: 14,
    color: '#1F2937',
  },
  searchButton: {
    backgroundColor: '#ff2511',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  searchButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loaderContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
});

export default HomeScreen;