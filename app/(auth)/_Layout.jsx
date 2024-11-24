import {  Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";



const AuthLayout = () => {
  
  

  return (
    <>
      <Stack>
        <Stack.Screen
          name="Sign_in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sign_up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
