import { Image, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/Colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location";
import { useState } from "react";
import getMapPreview from "../../Util/Location";
import { useNavigation } from "@react-navigation/native";

export default function LocationPicker(){
  const navigation = useNavigation()
  const [pickedLocation, setPickedLocation] = useState()
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
  async function verifyPermission(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if(locationPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Insufficient permission', 'You need to grant location permission to use this app')
      return false
    }
    return true
  }
  async function getLocationHandler(){
    const hasPermission = await verifyPermission()
    if(!hasPermission){
      return
    }
    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  function pickOnMapHandler(){
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet.</Text>

  if(pickedLocation){
    locationPreview = (
      <Image style={styles.image} source={{
        uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
      }}/>
    )
  }
  return (
    <>
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>Locate User</OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  }, 
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})