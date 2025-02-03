import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const SeatSelection = ({ seats = [], busId, navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const savedSeats = localStorage.getItem('selectedSeats');
    const savedTime = localStorage.getItem('seatTimer');

    if (savedSeats) {
      try {
        setSelectedSeats(JSON.parse(savedSeats));
      } catch (e) {
        setSelectedSeats([]);
      }
    }

    if (savedTime) {
      const expiryTime = parseInt(savedTime);
      if (expiryTime > Date.now()) {
        setTimeLeft(Math.floor((expiryTime - Date.now()) / 1000));
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0 && selectedSeats.length > 0) {
      setSelectedSeats([]);
      localStorage.removeItem('selectedSeats');
      localStorage.removeItem('seatTimer');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedSeats]);

  const toggleSeat = (seatNumber) => {
    const updatedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(s => s !== seatNumber)
      : selectedSeats.length < 4 ? [...selectedSeats, seatNumber] : selectedSeats;

    setSelectedSeats(updatedSeats);

    if (updatedSeats.length > 0 && timeLeft <= 0) {
      const expiryTime = Date.now() + (10 * 60 * 1000);
      setTimeLeft(600);
      localStorage.setItem('seatTimer', expiryTime.toString());
    }

    localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
    localStorage.setItem('busId', JSON.stringify(busId));
  };

  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      toggleSeat(seat.seatNumber);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSeatRow = (startLeft, startRight) => {
    return (
      <View style={styles.seatRow}>
        <View style={styles.seatSide}>
          {[startLeft, startLeft + 1].map((index) => {
            const seat = seats[index - 1] || {};
            if (!seat.seatNumber) return null;
            return (
              <TouchableOpacity
                key={seat.seatNumber}
                onPress={() => handleSeatClick(seat)}
                disabled={seat.isBooked}
                style={[
                  styles.seatButton,
                  seat.isBooked && styles.bookedSeat,
                  selectedSeats.includes(seat.seatNumber) && styles.selectedSeat
                ]}
              >
                <MaterialCommunityIcons 
                  name="seat" 
                  size={30} 
                  color={seat.isBooked ? '#FF6B6B' : 
                    selectedSeats.includes(seat.seatNumber) ? '#48BB78' : '#E2E8F0'}
                />
                <Text style={styles.seatNumber}>{seat.seatNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.seatSide}>
          {[startRight, startRight + 1].map((index) => {
            const seat = seats[index - 1] || {};
            if (!seat.seatNumber) return null;
            return (
              <TouchableOpacity
                key={seat.seatNumber}
                onPress={() => handleSeatClick(seat)}
                disabled={seat.isBooked}
                style={[
                  styles.seatButton,
                  seat.isBooked && styles.bookedSeat,
                  selectedSeats.includes(seat.seatNumber) && styles.selectedSeat
                ]}
              >
                <MaterialCommunityIcons 
                  name="seat" 
                  size={30} 
                  color={seat.isBooked ? '#FF6B6B' : 
                    selectedSeats.includes(seat.seatNumber) ? '#48BB78' : '#E2E8F0'}
                />
                <Text style={styles.seatNumber}>{seat.seatNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>
            {selectedSeats.length === 0 ? "No Seats Selected" : "Selected Seats"}
          </Text>
          {selectedSeats.length > 0 && (
            <View style={styles.selectedSeatsContainer}>
              {selectedSeats.map(seat => (
                <Text key={seat} style={styles.selectedSeatTag}>{seat}</Text>
              ))}
            </View>
          )}
        </View>
        <View>
          {timeLeft > 0 ? (
            <View style={styles.timerContainer}>
              <Feather name="clock" size={16} color="#EF4444" />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timerSubtext}>Time remaining</Text>
            </View>
          ) : null}
        </View>
      </View>

      {selectedSeats.length > 0 && timeLeft > 0 && (
        <View style={styles.warningContainer}>
          <Feather name="alert-circle" size={16} color="#F59E0B" />
          <Text style={styles.warningText}>
            Complete payment within {formatTime(timeLeft)} to secure your seats
          </Text>
        </View>
      )}

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#FF6B6B'}]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#A0AEC0'}]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#F6E05E'}]} />
          <Text style={styles.legendText}>Hold</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#48BB78'}]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>

      <View style={styles.seatsContainer}>
        {seats.length === 0 ? (
          <Text style={styles.noSeatsText}>No seats available</Text>
        ) : (
          <>
            {[...Array(10)].map((_, index) => {
              const leftStart = index * 2 + 1;
              const rightStart = 21 + index * 2;
              return renderSeatRow(leftStart, rightStart);
            })}

            <TouchableOpacity 
              style={styles.proceedButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  selectedSeatsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  selectedSeatTag: {
    backgroundColor: '#EBF8FF',
    color: '#3182CE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 5,
    fontSize: 12,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  timerSubtext: {
    fontSize: 10,
    color: '#718096',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#B45309',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#4A5568',
  },
  seatsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  noSeatsText: {
    textAlign: 'center',
    color: '#718096',
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seatSide: {
    flexDirection: 'row',
    gap: 10,
  },
  seatButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
  },
  bookedSeat: {
    backgroundColor: '#FEE2E2',
  },
  selectedSeat: {
    backgroundColor: '#C6F6D5',
  },
  seatNumber: {
    fontSize: 12,
    color: '#4A5568',
  },
  proceedButton: {
    backgroundColor: '#3182CE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SeatSelection;