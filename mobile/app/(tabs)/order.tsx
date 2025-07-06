import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OrderScreen() {
  const [selectedShipping, setSelectedShipping] = useState('ship');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('11:00 Am');
  const [selectedItemType, setSelectedItemType] = useState('Product');

  const renderShippingOption = ({id, icon, Component}: any = Ionicons) => (
    <TouchableOpacity 
      style={[
        styles.shippingOption,
        selectedShipping === id && styles.selectedShippingOption
      ]}
      onPress={() => setSelectedShipping(id)}
    >
      <Component name={icon} size={24} color={selectedShipping === id ? '#fff' : '#333'} />
    </TouchableOpacity>
  );

  const renderTimeOption = ({time}: any) => (
    <TouchableOpacity 
      style={[
        styles.timeOption,
        selectedTime === time && styles.selectedTimeOption
      ]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={[
        styles.timeText,
        selectedTime === time && styles.selectedTimeText
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  const renderItemTypeOption = ({type}: any) => (
    <TouchableOpacity 
      style={[
        styles.itemTypeOption,
        selectedItemType === type && styles.selectedItemTypeOption
      ]}
      onPress={() => setSelectedItemType(type)}
    >
      <Text style={[
        styles.itemTypeText,
        selectedItemType === type && styles.selectedItemTypeText
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place Order</Text>
        </View>

        {/* <View style={styles.shippingOptionsContainer}>
          {renderShippingOption('plane', 'airplane', Ionicons)}
          {renderShippingOption('ship', 'cube', Ionicons)}
          {renderShippingOption('truck', 'truck', FontAwesome5)}
          {renderShippingOption('train', 'train', MaterialIcons)}
        </View> */}

        <Text style={styles.sectionTitle}>Pick-Up Point</Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationIconContainer}>
            <MaterialIcons name="location-on" size={20} color="#ff6b00" />
            <View style={styles.locationConnector} />
          </View>
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Pick-up Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationIconContainer}>
            <MaterialIcons name="location-on" size={20} color="#0A1172" />
          </View>
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Drop-In Location"
              value={dropLocation}
              onChangeText={setDropLocation}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>

        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="MM/DD/YYYY"
              value={pickupDate}
              onChangeText={setPickupDate}
            />
            <TouchableOpacity style={styles.calendarIcon}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="MM/DD/YYYY"
              value={deliveryDate}
              onChangeText={setDeliveryDate}
            />
            <TouchableOpacity style={styles.calendarIcon}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pick-up Time</Text>

        <View style={styles.timeOptionsContainer}>
          <View style={styles.timeRow}>
            {renderTimeOption('9:00 Am')}
            {renderTimeOption('11:00 Am')}
            {renderTimeOption('1:00 Pm')}
          </View>
          <View style={styles.timeRow}>
            {renderTimeOption('04:00 Pm')}
            {renderTimeOption('6:00 Pm')}
            {renderTimeOption('8:00 Pm')}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Item Description</Text>

        <View style={styles.itemTypeContainer}>
          <View style={styles.itemTypeRow}>
            {renderItemTypeOption('Food')}
            {renderItemTypeOption('Car')}
            {renderItemTypeOption('Product')}
          </View>
          <View style={styles.itemTypeRow}>
            {renderItemTypeOption('Machine')}
            {renderItemTypeOption('Medicine')}
            {renderItemTypeOption('Glass')}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
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
  shippingOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  shippingOption: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedShippingOption: {
    backgroundColor: '#ff6b00',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f51b5',
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  locationIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  locationConnector: {
    width: 2,
    height: 25,
    backgroundColor: '#ddd',
    marginTop: 5,
  },
  locationInputContainer: {
    flex: 1,
  },
  locationInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '48%',
  },
  dateInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
  },
  calendarIcon: {
    padding: 5,
  },
  timeOptionsContainer: {
    marginBottom: 25,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
    alignItems: 'center',
  },
  selectedTimeOption: {
    backgroundColor: '#ff6b00',
  },
  timeText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemTypeContainer: {
    marginBottom: 25,
  },
  itemTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTypeOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
    alignItems: 'center',
  },
  selectedItemTypeOption: {
    backgroundColor: '#ff6b00',
  },
  itemTypeText: {
    color: '#333',
    fontSize: 14,
  },
  selectedItemTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});