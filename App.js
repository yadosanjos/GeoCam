import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from './src/routes/stack';
import CameraScreen from './src/screens/camera';

export default function App() {
  return (
    <CameraScreen/>
  );
}

