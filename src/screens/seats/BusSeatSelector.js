import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const BusSeatSelector = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
  const [timerActive, setTimerActive] = useState(false);

  // Create seats for left and right sides
  const createSeats = (side) => {
    const seats = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 2; col++) {
        const seatNumber = side === 'left' 
          ? row * 2 + col + 1 
          : row * 2 + col + 21;
        seats.push({
          number: seatNumber,
          type: row === 2 && col === 0 ? 'emergency' : 'normal'
        });
      }
    }
    return seats;
  };

  const leftSeats = createSeats('left');
  const rightSeats = createSeats('right');

  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack(); // Navigate to previous screen
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            Alert.alert('Time Expired', 'Your seat selection time has expired.');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Seat selection handler
  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(seat => seat !== seatNumber);
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
          isEmergencySeat && styles.emergencySeat
        ]}
        onPress={() => !isEmergencySeat && handleSeatSelect(seat.number)}
      >
        <Icon 
          name={isSelected 
            ? 'event-seat' 
            : (isEmergencySeat ? 'warning' : 'airline-seat-recline-normal')
          } 
          size={30} 
          color={
            isEmergencySeat 
              ? '#FFA500' 
              : (isSelected ? '#4CAF50' : '#2196F3')
          } 
        />
        <Text style={[
          styles.seatNumber,
          isEmergencySeat && styles.emergencySeatText
        ]}>
          {seat.number}
        </Text>
        {isEmergencySeat && (
          <Text style={styles.emergencySeatLabel}>Emergency Exit</Text>
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
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: () => {
          // Implement booking logic
          console.log('Booked Seats:', selectedSeats);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
        >
          <Icon name="arrow-back" size={24} color="#2196F3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Green Line Paribahan</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bus Information Header */}
        <View style={styles.busInfoHeader}>
          <View style={styles.busInfoContent}>
            <Icon name="directions-bus" size={40} color="#4CAF50" /> {/* Changed to green */}
            <View style={styles.busInfoText}>
              <Text style={styles.busRouteText}>Dhaka to Chittagong Express</Text>
              <Text style={styles.busDetailsText}>AC Sleeper | Seat Booking</Text>
            </View>
          </View>
        </View>

        {/* Selected Seats Display */}
        <View style={styles.selectedSeatsContainer}>
          <Text style={styles.selectedSeatsTitle}>Selected Seats:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.selectedSeatsList}
          >
            {selectedSeats.map(seat => (
              <View key={seat} style={styles.selectedSeatBadge}>
                <Text style={styles.selectedSeatText}>{seat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Timer and Payment Alert */}
        {timerActive && (
          <View style={styles.timerAlertContainer}>
            <View style={styles.timerSection}>
              <Icon name="timer" size={25} color="#FF5722" />
              <Text style={styles.timerText}>Time Remaining</Text>
              <Text style={styles.timerValueText}>{formatTimer()}</Text>
            </View>
            <Text style={styles.timerDescriptionText}>
              You need to confirm your ticket within this time.
            </Text>
          </View>
        )}
        
        {/* Seats Layout */}
        <View style={styles.seatsContainer}>
          <Text style={styles.seatsTitle}>Select Your Seats</Text>
          <View style={styles.busLayout}>
            {/* Left Side Seats */}
            <View style={styles.seatSide}>
              {leftSeats.map(seat => renderSeat(seat, 'left'))}
            </View>

            {/* Right Side Seats */}
            <View style={styles.seatSide}>
              {rightSeats.map(seat => renderSeat(seat, 'right'))}
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={confirmBooking}
          >
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
    backgroundColor: '#F5F5F5',
    paddingTop: 30
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  backButton: {
    width: 40
  },
  headerTitle: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerPlaceholder: {
    width: 40
  },
  scrollViewContent: {
    paddingBottom: 20
  },
  // Bus Info Header
  busInfoHeader: {
    backgroundColor: 'white', // Changed to white
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10
  },
  busInfoContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  busInfoText: {
    marginLeft: 15
  },
  busRouteText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  busDetailsText: {
    color: '#666',
    fontSize: 14
  },
  // Selected Seats Container
  selectedSeatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  selectedSeatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  selectedSeatsList: {
    flexGrow: 0
  },
  selectedSeatBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5
  },
  selectedSeatText: {
    color: 'white',
    fontSize: 14
  },
  // Timer Alert
  timerAlertContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#F0F0F0'
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F0F0F0'
  },
  timerText: {
    fontSize: 14,
    marginLeft: 5
  },
  timerValueText: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  timerDescriptionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0'
  },
  // Seats Container
  seatsContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  seatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  busLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  seatSide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '48%',
    justifyContent: 'center'
  },
  seat: {
    width: '45%',
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
    shadowRadius: 2
  },
  selectedSeat: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50'
  },
  emergencySeat: {
    backgroundColor: '#FFF9C4',
    borderColor: '#FFA500',
    opacity: 0.7
  },
  seatNumber: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  emergencySeatText: {
    color: '#FFA500'
  },
  emergencySeatLabel: {
    fontSize: 8,
    color: '#FFA500',
    marginTop: 2
  },
  // Confirm Button
  confirmButton: {
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden'
  },
  confirmButtonGradient: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center'
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default BusSeatSelector;