import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const BusSeatSelector = () => {
  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
  const [timerActive, setTimerActive] = useState(false);

  // Create seats for left and right sides
  const createSeats = (side) => {
    const seats = [];
    const startNumber = side === 'left' ? 1 : 21; // Left: 1-20, Right: 21-40
    for (let row = 0; row < 10; row++) {
      // 10 rows
      for (let col = 0; col < 2; col++) {
        // 2 seats per row
        const seatNumber = startNumber + row * 2 + col;
        seats.push({
          number: seatNumber,
          type: row === 9 && col === 0 ? 'emergency' : 'normal', // Last row, first seat is emergency
        });
      }
    }
    return seats;
  };

  const leftSeats = createSeats('left');
  const rightSeats = createSeats('right');

  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            Alert.alert(
              'Time Expired',
              'Your seat selection time has expired.'
            );
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // Seat selection handler
  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else if (prev.length < 4) {
        setTimerActive(true);
        return [...prev, seatNumber];
      } else {
        Alert.alert('Limit Exceeded', 'You can select max 4 seats');
        return prev;
      }
    });
  };

  // Format timer display
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Render seat
  const renderSeat = (seat, side) => {
    const isSelected = selectedSeats.includes(seat.number);
    const isEmergencySeat = seat.type === 'emergency';

    return (
      <TouchableOpacity
        key={seat.number}
        style={[
          styles.seat,
          isSelected && styles.selectedSeat,
          isEmergencySeat && styles.emergencySeat,
        ]}
        onPress={() => !isEmergencySeat && handleSeatSelect(seat.number)}>
        <Icon
          name={
            isSelected
              ? 'event-seat'
              : isEmergencySeat
              ? 'warning'
              : 'airline-seat-recline-normal'
          }
          size={20}
          color={
            isEmergencySeat ? '#FFA500' : isSelected ? '#4CAF50' : '#2196F3'
          }
        />
        <Text
          style={[
            styles.seatNumber,
            isEmergencySeat && styles.emergencySeatText,
          ]}>
          {seat.number}
        </Text>
        {isEmergencySeat && (
          <Text style={styles.emergencySeatLabel}>Emergency</Text>
        )}
      </TouchableOpacity>
    );
  };

  // Confirm booking
  const confirmBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Select Seats', 'Please select at least one seat');
      return;
    }
    Alert.alert(
      'Confirm Booking',
      `Selected Seats: ${selectedSeats.join(', ')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            navigation.navigate('Payment');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="#ff2511" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Green Line Paribahan</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {/* Bus Information Header */}
        <View style={styles.busInfoHeader}>
          <View style={styles.busInfoContent}>
            <Icon name="directions-bus" size={40} color="#ff2511" />
            <View style={styles.busInfoText}>
              <Text style={styles.busRouteText}>
                Dhaka to Chittagong Express
              </Text>
              <Text style={styles.busDetailsText}>
                AC Sleeper | Seat Booking
              </Text>
            </View>
          </View>
        </View>
        {/* Timer and Payment Alert */}
        // Timer Alert Section Update
        {timerActive && (
          <View style={styles.timerAlertContainer}>
            <View style={styles.timerSection}>
              <Icon name="timer" size={25} color="#FF5722" />
              <Text style={styles.timerText}>Time Remaining</Text>
              <Text style={styles.timerValueText}>{formatTimer()}</Text>
            </View>
            <Text style={styles.timerDescriptionText}>
              Seats Selected:{' '}
              {selectedSeats.length === 0 ? 'None' : selectedSeats.join(', ')}
            </Text>
          </View>
        )}
        {/* New Seat Legend Section */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <Icon
              name="airline-seat-recline-normal"
              size={20}
              color="#2196F3"
            />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <Icon name="event-seat" size={20} color="#FF0000" />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <Icon name="event-seat" size={20} color="#FFA500" />
            <Text style={styles.legendText}>Hold</Text>
          </View>
          <View style={styles.legendItem}>
            <Icon name="event-seat" size={20} color="#4CAF50" />
            <Text style={styles.legendText}>Selected</Text>
          </View>
        </View>
        {/* Seats Layout */}
        <View style={styles.seatsContainer}>
          <Text style={styles.seatsTitle}>Select Your Seats</Text>
          <View style={styles.busLayout}>
            {/* Left Side Seats */}
            <View style={styles.seatSide}>
              {leftSeats.map((seat) => renderSeat(seat, 'left'))}
            </View>

            {/* Right Side Seats */}
            <View style={styles.seatSide}>
              {rightSeats.map((seat) => renderSeat(seat, 'right'))}
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmBooking}>
            <View style={styles.confirmButtonGradient}>
              <Text style={styles.confirmButtonText}>
                Confirm Seats ({selectedSeats.length})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: 30,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    color: '#050a30',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  // Bus Info Header
  busInfoHeader: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 5,
  },
  busInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busInfoText: {
    marginLeft: 15,
  },
  busRouteText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  busDetailsText: {
    color: '#666',
    fontSize: 14,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    // borderRadius: 5,
    // elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  legendText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  // Timer Alert
  timerAlertContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#F0F0F0',
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  timerText: {
    fontSize: 14,
    marginLeft: 5,
  },
  timerValueText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  timerDescriptionText: {
    fontSize: 12,
    color: '#d35400',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  // Seats Container
  seatsContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4
  },
  seatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  busLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatSide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '48%',
    justifyContent: 'center',
  },
  seat: {
    width: '35%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedSeat: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  emergencySeat: {
    backgroundColor: '#FFF9C4',
    borderColor: '#FFA500',
    opacity: 0.7,
  },
  seatNumber: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emergencySeatText: {
    color: '#FFA500',
  },
  emergencySeatLabel: {
    fontSize: 8,
    color: '#FFA500',
    marginTop: 2,
  },
  // Confirm Button
  confirmButton: {
    // marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    backgroundColor: '#ff2511',
    padding: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusSeatSelector;
