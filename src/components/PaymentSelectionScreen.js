import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back arrow
import { useNavigation } from '@react-navigation/native';
const PaymentSelectionScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();
  const busDetails = {
    from: 'Dhaka',
    to: 'Chittagong',
    date: 'Feb 5, 2025',
    time: '10:30 AM',
    seats: '2B, 2C',
    amount: 1200,
  };

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      logo: 'https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2013/01/300px-BKash.png',
      description: 'Pay securely with your bKash account',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      logo: 'https://cdn-icons-png.flaticon.com/128/16378/16378474.png',
      description: 'Pay with Visa, Mastercard, or American Express',
    },
  ];

  const handleContinue = () => {
    if (selectedMethod) {
      navigation.navigate('History', { method: selectedMethod });
    }
  };

  const PaymentMethodCard = ({ method }) => (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        selectedMethod === method.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedMethod(method.id)}>
      <Image
        source={{ uri: method.logo }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentName}>{method.name}</Text>
        <Text style={styles.paymentDescription}>{method.description}</Text>
      </View>
      {selectedMethod === method.id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Seats')}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView>
        {/* Journey Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Journey Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Route:</Text>
              <Text style={styles.detailValue}>
                {busDetails.from} to {busDetails.to}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time:</Text>
              <Text style={styles.detailValue}>
                {busDetails.date}, {busDetails.time}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Seats:</Text>
              <Text style={styles.detailValue}>{busDetails.seats}</Text>
            </View>
            <View style={[styles.detailRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>৳{busDetails.amount}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Payment Method</Text>
          {paymentMethods.map((method) => (
            <PaymentMethodCard key={method.id} method={method} />
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedMethod && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={!selectedMethod}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff2511',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: '#d6dbdf',
    backgroundColor: 'white',
  },
  logo: {
    width: 60,
    height: 40,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#ff2511',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#ff2511',
    margin: 16,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentSelectionScreen;
