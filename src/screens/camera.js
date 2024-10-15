import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons'

export default function CameraScreen() {
  const camRef = useRef(null);
  const [Type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if(hasPermission === null){
    return <View/>;
  }

  if(hasPermission === false){
    return <Text> Acesso Negado! </Text>;
  }

  async function takePicture() {
      if(camRef){
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri);
        setOpen(true);
        console.log(data);
      }
  }

  return (
  <SafeAreaView style={styles.container}>
      <Camera 
        styles={{ flex: 1 }}
        Type={Type}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', FlexDirection: 'row '}}> 
           <TouchableOpacity 
             styles={{
              position: 'absolute',
              bottom: 20,
              left: 20,
             }}
             onPress={ () => (
              setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              )
             )}>
              <Text style={{ fontSize: 20, marginBottom: 13, color: '#FFF'}}> Trocar </Text>
           </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.button} onPress={ takePicture }>
             <FontAwesome name="camera" size={23} color="#FFF"/>
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        > 
          <View style={{flex: 1, justifyContent: 'cenyter', alignItems: 'center', margin: 20}}>
            <TouchableOpacity styel={{margin: 10}} onPress={ () => setOpen(false) }>
               <FontAwesome  name="arrow-left" size={50} color="#FF0000"/>
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
  },
  button:{
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  }
});