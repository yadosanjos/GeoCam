import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native'; 

const LocalScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: -23.55052, // Valor inicial genérico
    longitude: -46.633308, // Valor inicial genérico
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Atualiza a região do mapa
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // Ajusta o zoom do mapa
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão para acessar a localização foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  let text = 'Esperando pela localização...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#04c4e1" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
          />
        )}
      </MapView>
      <Text style={styles.text}>{text}</Text>
      <Button title="Atualizar Localização" onPress={handleGetLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5a54c',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
    marginTop: 30,
  },
  text: {
    margin: 10,
    textAlign: 'center',
    color: '#04c4e1',
  },
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20, 
    zIndex: 10, 
    backgroundColor: '#011b28',
    padding: 10,
    borderRadius: 50,
  },
});

export default LocalScreen;




