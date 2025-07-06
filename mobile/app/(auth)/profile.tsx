import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { useAuthStore } from '../store/auth'

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { signout } = useAuthStore()
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/women/43.jpg' }} style={styles.profileImage} /> */}
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Brooklyn Simmons</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="person-outline" size={22} color="#333" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Edit Profile</Text>
            <Text style={styles.menuSubtitle}>Name, phone no, address, email</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="wallet-outline" size={22} color="#333" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>My Wallet</Text>
            <Text style={styles.menuSubtitle}>Add Card, Topup</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="notifications-outline" size={22} color="#333" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Notification</Text>
            <Text style={styles.menuSubtitle}>Mute, unmute</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="globe-outline" size={22} color="#333" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Language</Text>
            <Text style={styles.menuSubtitle}>English, French, etc...</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="moon-outline" size={22} color="#333" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Dark Version</Text>
          </View>
          <Switch trackColor={{ false: "#e0e0e0", true: "#0A1172" }} thumbColor={isDarkMode ? "#fff" : "#f4f3f4"} ios_backgroundColor="#e0e0e0" onValueChange={toggleDarkMode} value={isDarkMode} />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(255, 107, 0, 0.1)' }]}>
            <Ionicons name="log-out-outline" size={22} color="#ff6b00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: '#ff6b00' }]} onPress={signout}>Sign Out</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0A1172',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
})