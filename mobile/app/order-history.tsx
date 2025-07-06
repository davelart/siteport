import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OrderHistoryScreen() {
  const [trackingId, setTrackingId] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const renderTabButton = ({title}: any) => (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        activeTab === title && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(title)}
    >
      <Text style={[
        styles.tabButtonText, 
        activeTab === title && styles.activeTabButtonText
      ]}>
        {title}
      </Text>
      {activeTab === title && <View style={styles.activeTabIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <View style={styles.trackingContainer}>
        <View style={styles.trackingInputContainer}>
          <Ionicons name="cube-outline" size={24} color="#666" style={styles.trackingIcon} />
          <TextInput
            style={styles.trackingInput}
            placeholder="Tracking ID"
            value={trackingId}
            onChangeText={setTrackingId}
          />
        </View>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>TRACK</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {renderTabButton('All')}
        {renderTabButton('Completed')}
        {renderTabButton('Ongoing')}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.ordersContainer}>
        {/* Order Card - Ongoing */}
        <View style={styles.orderCard}>
          <View style={styles.orderCardContent}>
            <Text style={styles.orderDate}>Fri 23,2024, May</Text>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Tracking Number :</Text>
              <Text style={styles.orderDetailValue}>R-7458-4567-4434-5854</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Package items :</Text>
              <Text style={styles.orderDetailValue}>Books ans stationery, Garri Ngwa</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Weight of items :</Text>
              <Text style={styles.orderDetailValue}>1000kg</Text>
            </View>
            
            <Link href="/order-detail" asChild>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={[styles.statusIndicator, styles.ongoingIndicator]}>
            <Text style={styles.statusText}>On going</Text>
          </View>
        </View>

        {/* Order Card - Completed */}
        <View style={styles.orderCard}>
          <View style={styles.orderCardContent}>
            <Text style={styles.orderDate}>Fri 23,2024, May</Text>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Tracking Number :</Text>
              <Text style={styles.orderDetailValue}>R-7458-4567-4434-5854</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Package items :</Text>
              <Text style={styles.orderDetailValue}>Books ans stationery, Garri Ngwa</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Weight of items :</Text>
              <Text style={styles.orderDetailValue}>1000kg</Text>
            </View>
            
            <Link href="/order-detail" asChild>
              <TouchableOpacity style={[styles.viewButton, styles.orangeButton]}>
                <Text style={styles.orangeButtonText}>View</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={[styles.statusIndicator, styles.completedIndicator]}>
            <Text style={styles.completedStatusText}>Completed</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cube-outline" size={24} color="#333" />
          <Text style={styles.navText}>Track</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <View style={styles.navIconCircle}>
            <Ionicons name="cube" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="wallet-outline" size={24} color="#333" />
          <Text style={styles.navText}>Wallet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3f51b5',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  trackingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  trackingInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  trackingIcon: {
    marginRight: 10,
  },
  trackingInput: {
    flex: 1,
    height: 45,
  },
  trackButton: {
    backgroundColor: '#ff6b00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 20,
    position: 'relative',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#3f51b5',
  },
  tabButtonText: {
    color: '#999',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#3f51b5',
    borderRadius: 3,
  },
  ordersContainer: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  orderCardContent: {
    flex: 1,
    padding: 15,
  },
  orderDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  orderDetailLabel: {
    color: '#666',
    fontSize: 13,
    width: 120,
  },
  orderDetailValue: {
    color: '#333',
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
  },
  viewButton: {
    backgroundColor: '#0A1172',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  orangeButton: {
    backgroundColor: '#ff6b00',
  },
  orangeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusIndicator: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  ongoingIndicator: {
    backgroundColor: '#ff6b00',
  },
  completedIndicator: {
    backgroundColor: '#0A1172',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    transform: [{ rotate: '180deg' }],
  },
  completedStatusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    transform: [{ rotate: '180deg' }],
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    transform: [{ translateY: -15 }],
  },
  navIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0A1172',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
})
