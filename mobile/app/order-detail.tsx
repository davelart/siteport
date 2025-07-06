import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
        <View style={styles.truckImageContainer}>
          {/* <Image source={require('../assets/images/delivery-truck.png')} style={styles.truckImage} resizeMode="contain"/> */}
          <Text style={styles.truckId}>KA05AK0434</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tracking Number :</Text>
            <Text style={styles.detailValue}>R-7458-4567-4434-5854</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Package items :</Text>
            <Text style={styles.detailValue}>Books ans stationery, Garri Ngwa</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weight of items :</Text>
            <Text style={styles.detailValue}>1000kg</Text>
          </View>
        </View>

        <View style={styles.driverCard}>
          <View >
            {/* <Image source={require('../assets/images/driver.jpg')} /> */}
            <View >
              <Text >Mr. Albert</Text>
              <Text >Truck Manager</Text>
            </View>
          </View>
          
          <View >
            <TouchableOpacity >
              <Text >Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity >
              <Text >Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View >
          <Text >Package Status</Text>
          
          <View >
            {/* Courier requested */}
            <View >
              <View >
                <View >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
                <View  />
              </View>
              <View >
                <Text >Courier requested</Text>
                <Text >July 7 2022   08:30am</Text>
              </View>
            </View>
            
            {/* Package ready for delivery */}
            <View >
              <View >
                <View >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
                <View  />
              </View>
              <View >
                <Text >Package ready for delivery</Text>
                <Text >July 7 2022   09:30am</Text>
              </View>
            </View>
            
            {/* Package in transit */}
            <View >
              <View >
                <View  />
                <View  />
              </View>
              <View >
                <Text >Package in transit</Text>
                <Text >July 7 2022   10:30am</Text>
              </View>
            </View>
            
            {/* Package delivered */}
            <View >
              <View >
                <View  />
              </View>
              <View >
                <Text >Package delivered</Text>
                <Text >July 7 2022   10:30am</Text>
              </View>
            </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  truckImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  truckImage: {
    width: 200,
    height: 120,
  },
  truckId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#666',
    fontSize: 14,
  },
  detailValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
})
