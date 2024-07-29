import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton.js";


export default function ImagePicker(){
  const [pickedImage, setPickedImage] = useState()
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
  async function verifyPermission(){
    if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if(cameraPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Insufficient permission', 'You need to grant camera permission to use this app')
      return false
    }
    return true
  }
  async function takeImageHandler(){
    const hasPermission = await verifyPermission()
    if(!hasPermission){
      return
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    setPickedImage(image.uri)
  }
  let imagePreview = <Text>No image taken yet</Text>
  if(pickedImage){
    imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
  }
  return (
    <>
      <View>
        <View style={styles.imagePreview}>
          {imagePreview}
        </View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>Take photo</OutlinedButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imagePreview:{
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image:{
    width: '100%',
    height: '100%',
  }
})