import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '../store/auth';

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/signin'}/>
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#ffd33d", headerStyle: { backgroundColor: '#25292e' }, headerShadowVisible: false, headerTintColor: '#fff', tabBarStyle: { backgroundColor: '#25292e' } }}>
      <Tabs.Screen name="index" options={{ title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={ focused ? 'home-sharp' : 'home-outline' } size={24} color={color} />
          )
        }} />
      <Tabs.Screen name="track" options={{ title: 'Track',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={ focused ? 'cube-sharp' : 'cube-outline' } size={24} color={color} />
          )
        }} />
      <Tabs.Screen name="order" options={{ title: 'New Order', 
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="plus-square" size={22} color={color} solid={focused} />
          )
        }} />
        <Tabs.Screen name='wallet' options={{ title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={ focused ? 'wallet-sharp' : 'wallet-outline' } size={24} color={color} />
          )
        }} />
        <Tabs.Screen name='profile' options={{ title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={ focused ? 'person-sharp' : 'person-outline' } size={24} color={color} />
          )
         }} />
    </Tabs>
  )
}
