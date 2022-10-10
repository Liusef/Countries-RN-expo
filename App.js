import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading , { LoadingDefault }  from './comps/loading';
import Home from './comps/home';
import Countries from './comps/countries';

const Nav = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme == "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar/>
      <Nav.Navigator>
        <Nav.Screen name="Home" 
                      component={Home}
                      options={{
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                      }}/>
        <Nav.Screen name="Countries" 
                    component={Countries}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="globe-model" color={color} size={size}/>
                      ),
                      headerShown: false,
                    }}/>
        <Nav.Screen name="Loading" 
                    component={Loading}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="application" color={color} size={size} />
                      ),
                    }}/>
      </Nav.Navigator>
    </NavigationContainer>
  );
}


