import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const InboxScreen = () => {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Departure in 2 hours',
      message: "Your bus (ABC123) to New York departs in 2 hours. Don't forget to complete check-in.",
      time: '2h ago',
      icon: { name: 'clock', color: '#3B82F6' },
      isUnread: true
    },
    {
      id: 2,
      type: 'delay',
      title: 'Schedule Change Alert',
      message: 'Due to heavy traffic, your bus from Boston is delayed by 15 minutes.',
      time: '3h ago',
      icon: { name: 'alert-circle', color: '#F59E0B' },
      isUnread: true
    },
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationContainer, item.isUnread && styles.unreadNotification]}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon.name} size={24} color={item.icon.color} />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, item.isUnread && styles.unreadTitle]}>
            {item.title}
          </Text>
          {item.isUnread && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  markReadText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationList: {
    padding: 16,
  },
  notificationContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
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
    padding: 10,
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
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#3B82F6',
  },
});

export default InboxScreen;
