import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  LilitaOne_400Regular
} from "@expo-google-fonts/lilita-one";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function HomeScreen({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          LilitaOne_400Regular
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={styles.container}  onLayout={onLayoutRootView}>
       <TouchableOpacity style={styles.buttonLocal} onPress={() => navigation.navigate('Local')}> 
       <Text style={styles.texto}> Localização </Text>
       <Icon name="location-on" size={50} color="#035c6f" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.buttonCamera} onPress={() => navigation.navigate('Camera')}> 
       <Text style={styles.texto2}> Foto </Text>
       <Icon name="camera" size={50} color="#91612b" />
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#03111e',
  },
  buttonLocal:{
    width: 300,
    height: 180,
    backgroundColor: '#04c4e1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 55,
    fontFamily: 'LilitaOne_400Regular',
    color: '#035c6f',
  },
  buttonCamera:{
    width: 300,
    height: 180,
    backgroundColor: '#f5a54c',
    marginTop: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto2: {
    fontSize: 60,
    fontFamily: 'LilitaOne_400Regular',
    color: '#91612b',
  },
});