import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const [trackingId, setTrackingId] = useState('')
  const [activeTab, setActiveTab] = useState('International')

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
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome! 👋</Text>
            <Text style={styles.nameText}>Brooklyn Simmons</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.trackingContainer}>
          <View style={styles.trackingInputContainer}>
            <Ionicons name="cube-outline" size={24} color="#666" style={styles.trackingIcon} />
            <TextInput style={styles.trackingInput} placeholder="Tracking ID" value={trackingId} onChangeText={setTrackingId} />
          </View>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>TRACK</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {renderTabButton('International')}
          {renderTabButton('National')}
          {renderTabButton('Department')}
        </View>

        <View style={styles.trackingCard}>
          <View style={styles.trackingCardHeader}>
            <Text style={styles.trackingCardTitle}>Tracking ID : 90NJ234567778</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>On Progress</Text>
            </View>
          </View>
          
          <View style={styles.trackingDetail}>
            <Ionicons name="cube" size={18} color="#3f51b5" />
            <Text style={styles.trackingDetailText}>Materials</Text>
          </View>
          
          <View style={styles.trackingDetail}>
            <Ionicons name="car" size={18} color="#3f51b5" />
            <Text style={styles.trackingDetailText}>24,000 ton Truck</Text>
          </View>
          
          <View style={styles.trackingDetail}>
            <Ionicons name="location" size={18} color="#3f51b5" />
            <Text style={styles.trackingDetailText}>Pick it up from : Bogota</Text>
          </View>
          
          <View style={styles.trackingDetail}>
            <Ionicons name="navigate" size={18} color="#ff6b00" />
            <Text style={styles.trackingDetailText}>Delivery to : Texas</Text>
          </View>
          
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.servicesTitle}>Services</Text>
        
        <View style={styles.servicesGrid}>
          <TouchableOpacity style={styles.serviceCard}>
            {/* <Image source={require('../../assets/images/railway.png')} style={styles.serviceImage} resizeMode="contain" /> */}
            <Text style={styles.serviceText}>Railway Shipping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.serviceCard}>
            {/* <Image source={require('../../assets/images/air.png')} style={styles.serviceImage} resizeMode="contain" /> */}
            <Text style={styles.serviceText}>Air Shipping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.serviceCard}>
            {/* <Image source={require('../../assets/images/ocean.png')} style={styles.serviceImage} resizeMode="contain" /> */}
            <Text style={styles.serviceText}>Ocean Shipping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.serviceCard}>
            {/* <Image source={require('../../assets/images/truck.png')} style={styles.serviceImage} resizeMode="contain" /> */}
            <Text style={styles.serviceText}>Truck Shipping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  trackingInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeTabButton: {
    backgroundColor: '#0A1172',
  },
  tabButtonText: {
    color: '#333',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  trackingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trackingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trackingCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    color: '#ff6b00',
    fontSize: 12,
    fontWeight: '500',
  },
  trackingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackingDetailText: {
    marginLeft: 10,
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#0A1172',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f51b5',
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#ff6b00',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 120,
  },
  serviceImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  serviceText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
