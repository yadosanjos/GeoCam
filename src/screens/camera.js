import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';

import { useNavigation } from '@react-navigation/native'; 

import Icon from 'react-native-vector-icons/Ionicons';

export default function CameraScreen() {
  const camRef = useRef(null);
  const [Type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation(); 
  
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Acesso Negado!</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#04c4e1" />
      </TouchableOpacity>
      
      <CameraView
        style={{ flex: 1 }}
        ref={camRef}
      >
      </CameraView>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>

      {capturedPhoto &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
              <FontAwesome name="rotate-left" size={50} color="#011b28" />
            </TouchableOpacity>

            <Image
              style={{ width: '100%', height: 500, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#011b28',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5a54c',
    margin: 20,
    borderRadius: 10,
    height: 50,
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
