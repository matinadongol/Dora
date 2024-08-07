import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import OutlineButton from "../UI/OutlineButton";


export default function ImagePicker({onTakeImage}){
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
    //console.log(image)
    if (!image.canceled) {  
      setPickedImage(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
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
        <OutlineButton icon="camera" onPress={takeImageHandler}>Take photo</OutlineButton>
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