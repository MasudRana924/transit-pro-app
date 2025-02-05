import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const BusResultsScreen = () => {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState('departure');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    ac: false,
    nonAc: false,
    sleeper: false,
    seater: false,
  });

  const buses = [
    {
      id: 1,
      operator: 'Hanif Enterprise',
      type: 'AC Sleeper',
      departure: '06:00 AM',
      arrival: '02:30 PM',
      duration: '8h 30m',
      price: 1200,
      rating: 4.5,
      seatsAvailable: 12,
      amenities: ['wifi', 'usb', 'coffee', 'blanket'],
      isRecommended: true,
    },
    {
      id: 2,
      operator: 'Shyamoli Paribahan',
      type: 'Non-AC Seater',
      departure: '07:30 AM',
      arrival: '03:00 PM',
      duration: '7h 30m',
      price: 800,
      rating: 4.2,
      seatsAvailable: 8,
      amenities: ['wifi', 'usb'],
      isRecommended: false,
    },
  ];

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

 const handleFilterChange = (filter) => {
  setSelectedFilters({
    ac: false,
    nonAc: false,
    sleeper: false,
    seater: false,
    [filter]: true, // Set the clicked filter to true, and others to false.
  });
};
  const applyFilters = () => {
    toggleFilterModal();
  };

  const filteredBuses = buses.filter((bus) => {
    if (selectedFilters.ac && !bus.type.includes('AC')) return false;
    if (selectedFilters.nonAc && bus.type.includes('AC')) return false;
    if (selectedFilters.sleeper && !bus.type.includes('Sleeper')) return false;
    if (selectedFilters.seater && !bus.type.includes('Seater')) return false;
    return true;
  });

  const renderBusItem = (bus) => (
    <View key={bus.id} style={styles.busContainer}>
      {bus.isRecommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Best Offer</Text>
        </View>
      )}

      <View style={styles.busHeader}>
        <View>
          <Text style={styles.operatorName}>{bus.operator}</Text>
          <Text style={styles.busType}>{bus.type}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>TK{bus.price}</Text>
          <Text style={styles.priceSubtext}>per person</Text>
        </View>
      </View>

      <View style={styles.journeyDetailsContainer}>
        <View style={styles.journeyDetail}>
          <Text style={styles.journeyDetailTime}>{bus.departure}</Text>
          <Text style={styles.journeyDetailLabel}>Departure</Text>
        </View>
        <View style={styles.journeyDetailCenter}>
          <FeatherIcon name="clock" size={20} color="#9CA3AF" />
          <Text style={styles.journeyDetailDuration}>{bus.duration}</Text>
        </View>
        <View style={styles.journeyDetail}>
          <Text style={styles.journeyDetailTime}>{bus.arrival}</Text>
          <Text style={styles.journeyDetailLabel}>Arrival</Text>
        </View>
      </View>

      <View style={styles.amenitiesContainer}>
        {bus.amenities.includes('wifi') && (
          <View style={styles.amenityItem}>
            <FeatherIcon name="wifi" size={16} color="#ff2511" />
            <Text style={styles.amenityText}>Wi-Fi</Text>
          </View>
        )}
        {bus.amenities.includes('coffee') && (
          <View style={styles.amenityItem}>
            <FontAwesomeIcon name="coffee" size={16} color="#ff2511" />
            <Text style={styles.amenityText}>Drinks</Text>
          </View>
        )}
      </View>

      <View style={styles.busFooter}>
        <View style={styles.ratingContainer}>
          <FeatherIcon name="star" size={16} color="#FBBF24" />
          <Text style={styles.ratingText}>{bus.rating}</Text>
          <Text style={styles.seatsText}>
            • {bus.seatsAvailable} seats left
          </Text>
        </View>
        <TouchableOpacity
          style={styles.selectSeatsButton}
          onPress={() => navigation.navigate('Seats')}>
          <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <FeatherIcon name="arrow-left" size={24} color="#ff2511" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={{ width: 24 }} /> {/* Placeholder to center the title */}
      </View>
      <ScrollView>
        <View style={styles.journeySummary}>
          <View style={styles.journeyLocations}>
            <View>
              <Text style={styles.locationText}>Dhaka</Text>
              <Text style={styles.dateText}>Thursday, February 15</Text>
            </View>
            <FeatherIcon name="arrow-right" size={20} color="#9CA3AF" />
            <View>
              <Text style={styles.locationText}>Chittagong</Text>
              <Text style={styles.dateText}>2 Passengers</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={styles.modifyText}>Modify</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterSortContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterModal}>
            <FeatherIcon name="filter" size={20} color="#ff2511" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <View style={styles.sortDropdown}>
              <Text style={styles.sortValue}>
                {sortBy === 'departure' ? 'Departure Time' : sortBy}
              </Text>
              <FeatherIcon name="chevron-down" size={16} color="#ff2511" />
            </View>
          </View>
        </View>

        {filteredBuses.map(renderBusItem)}

        {filteredBuses.length === 0 && (
          <View style={styles.noResultsContainer}>
            <View style={styles.noResultsIconContainer}>
              <FeatherIcon name="truck" size={32} color="#ff2511" />
            </View>
            <Text style={styles.noResultsTitle}>No buses found</Text>
            <Text style={styles.noResultsSubtitle}>
              Please modify your search criteria or select a different date
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Bus Type</Text>
            <View style={styles.filterOptions}>
              <Pressable
  style={[ 
    styles.filterOption,
    selectedFilters.ac && styles.filterOptionSelected,
  ]}
  onPress={() => handleFilterChange('ac')}>
  <Text style={styles.filterOptionText}>AC</Text>
</Pressable>
<Pressable
  style={[ 
    styles.filterOption,
    selectedFilters.nonAc && styles.filterOptionSelected,
  ]}
  onPress={() => handleFilterChange('nonAc')}>
  <Text style={styles.filterOptionText}>Non-AC</Text>
</Pressable>
<Pressable
  style={[ 
    styles.filterOption,
    selectedFilters.sleeper && styles.filterOptionSelected,
  ]}
  onPress={() => handleFilterChange('sleeper')}>
  <Text style={styles.filterOptionText}>Sleeper</Text>
</Pressable>
<Pressable
  style={[ 
    styles.filterOption,
    selectedFilters.seater && styles.filterOptionSelected,
  ]}
  onPress={() => handleFilterChange('seater')}>
  <Text style={styles.filterOptionText}>Seater</Text>
</Pressable>

            </View>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={toggleFilterModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={applyFilters}>
                <Text style={styles.modalButtonText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  journeySummary: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journeyLocations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 13,
    color: '#6B7280',
  },
  modifyText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '500',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonText: {
    marginLeft: 8,
    color: '#4B5563',
    fontSize: 14,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  sortValue: {
    marginRight: 4,
    fontSize: 14,
    color: '#4B5563',
  },
  busContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendedBadge: {
    backgroundColor: '#ff2511',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  operatorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  busType: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff2511',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  journeyDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  journeyDetail: {
    alignItems: 'center',
  },
  journeyDetailTime: {
    fontWeight: '600',
    color: '#1F2937',
  },
  journeyDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  journeyDetailCenter: {
    alignItems: 'center',
  },
  journeyDetailDuration: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amenityText: {
    fontSize: 14,
    color: '#6B7280',
  },
  busFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontWeight: '500',
    color: '#1F2937',
  },
  seatsText: {
    color: '#6B7280',
    fontSize: 12,
  },
  selectSeatsButton: {
    backgroundColor: '#ff2511',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  selectSeatsButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noResultsIconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 9999,
    padding: 16,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionSelected: {
    backgroundColor: '#ff2511',
    borderColor: '#ff2511',
    color:'white'
  },
  filterOptionText: {
    fontSize: 14,
    color: '#1F2937',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  modalButtonPrimary: {
    backgroundColor: '#ff2511',
  },
  modalButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default BusResultsScreen;