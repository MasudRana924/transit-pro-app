import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const InboxScreen = () => {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Departure in 2 hours',
      message: 'Your bus (ABC123) to New York departs in 2 hours. Don\'t forget to complete check-in.',
      time: '2h ago',
      icon: { name: 'clock', color: '#3B82F6' },
      isUnread: true
    },
    {
      id: 2,
      type: 'delay',
      title: 'Schedule Change Alert',
      message: 'Due to heavy traffic, your bus from Boston is delayed by 15 minutes. New departure: 3:15 PM',
      time: '3h ago',
      icon: { name: 'alert-circle', color: '#F59E0B' },
      isUnread: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your ticket to Washington DC has been confirmed. Booking ID: WDC456',
      time: '1d ago',
      icon: { name: 'check', color: '#10B981' },
      isUnread: false
    },
    {
      id: 4,
      type: 'location',
      title: 'Bus Location Update',
      message: 'Your bus has reached Baltimore. Expected arrival in 45 minutes.',
      time: '1d ago',
      icon: { name: 'map-pin', color: '#6366F1' },
      isUnread: false
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Rate Your Journey',
      message: 'How was your recent trip to Philadelphia? Share your feedback.',
      time: '2d ago',
      icon: { name: 'truck', color: '#8B5CF6' },
      isUnread: false
    }
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationContainer, 
        item.isUnread && styles.unreadNotification
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon 
          name={item.icon.name} 
          size={20} 
          color={item.icon.color} 
          style={styles.icon}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[
            styles.notificationTitle, 
            item.isUnread && styles.unreadTitle
          ]}>
            {item.title}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={[
          styles.notificationMessage, 
          item.isUnread && styles.unreadMessage
        ]}>
          {item.message}
        </Text>
        {item.type === 'delay' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Icon name="bell" size={24} color="#3B82F6" />
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.notificationList}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIconContainer}>
            <Icon name="bell" size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyStateTitle}>No New Notifications</Text>
          <Text style={styles.emptyStateMessage}>
            We'll notify you when there are updates about your bookings
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  markReadText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  notificationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 9999,
    padding: 8,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5563',
  },
  unreadTitle: {
    color: '#111827',
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  unreadMessage: {
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateIconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 9999,
    padding: 16,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default InboxScreen;