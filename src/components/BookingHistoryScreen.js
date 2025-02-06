import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const bookings = [
  {
    id: '1',
    date: '01 Feb 2024',
    from: 'Dhaka',
    to: 'Chittagong',
    time: '10:00 AM',
    seats: 'A1, A2',
    status: 'Completed',
    price: '৳650',
    operator: 'GreenLine'
  },
  {
    id: '2',
    date: '28 Jan 2024',
    from: 'Sylhet',
    to: 'Comilla',
    time: '02:30 PM',
    seats: 'B3, B4',
    status: 'Cancelled',
    price: '৳500',
    operator: 'Hanif'
  }
];

const BookingHistoryScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const StatusBadge = ({ status }) => (
    <View style={[
      styles.statusBadge, 
      { 
        backgroundColor: status === 'Completed' 
          ? 'rgba(46, 204, 113, 0.1)' 
          : 'rgba(231, 76, 60, 0.1)' 
      }
    ]}>
      <Text style={[
        styles.statusText,
        { 
          color: status === 'Completed' 
            ? '#2ecc71' 
            : '#e74c3c' 
        }
      ]}>
        {status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Trips</Text>
        <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#333" />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((booking, index) => (
          <Animated.View 
            key={booking.id}
            entering={FadeInDown.delay(index * 100)}
            style={styles.bookingCard}
          >
            <View style={styles.cardHeader}>
              <View style={styles.routeContainer}>
                <Text style={styles.routeText}>{booking.from} → {booking.to}</Text>
                <StatusBadge status={booking.status} />
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.date}</Text>

                <MaterialCommunityIcons name="clock" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.time}</Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="seat" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.seats}</Text>

                <MaterialCommunityIcons name="bus" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.operator}</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{booking.price}</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingTop: 16,
  },
  bookingCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BookingHistoryScreen;