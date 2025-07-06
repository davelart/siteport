import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";

export default function RootLayout() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

