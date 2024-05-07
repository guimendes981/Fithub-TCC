import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import CadastroForm from "../components/CadastroForm";
import MinhaDieta from "../components/MinhaDieta";
import { auth } from "../services/firebaseConfig";

const Stack = createStackNavigator();

export default function Navigation({ user, updateUser }) {
  const [initialRouteName, setInitialRouteName] = useState("LoginForm");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        setInitialRouteName("Home");
        updateUser(userData); // Atualize o estado do usuário quando estiver autenticado
      } else {
        setInitialRouteName("LoginForm");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          initialParams={{ user, updateUser }} // Pass both user and updateUser to the Home component
        />
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroForm"
          component={CadastroForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinhaDieta"
          component={MinhaDieta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreinoForm"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
