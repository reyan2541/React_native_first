import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import  CustomButton from "../../components/custombutton";
import FormField from "../../components/FormField "
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false); 
  const [form, setForm] = useState({
    email: "",
    password: "",
    username:""         
  });

  const submit = async () => {
    // Validate form fields
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Exit the function if validation fails
    }
  
    setSubmitting(true); // Start loading state
  
    try {
      console.log("Submitting form...");
      const result = await createUser(form.email, form.password, form.username); // Wait until the user is created
      setUser(result);
      setIsLogged(true);
      console.log("User created successfully:", result);
  
      // Now that the user is created, navigate to /home
      console.log("Navigating to /home...");
      router.replace("/home"); // Navigate to the home route after successful submission
    } catch (error) {
      console.error("Error during submission:", error);
      Alert.alert("Error", error.message); // Show error message if the request fails
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };
  
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            //keyboardType="email-address"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            //keyboardType="paswword"
          />

          <CustomButton
            title="Sign UP"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
               have an account?
            </Text>
            <Link
              href="/Sign_in"
              className="text-lg font-psemibold text-secondary"
            >
              Signin
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
