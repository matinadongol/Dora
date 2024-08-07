import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../Util/database";


export default function PlaceDetails({route, navigation}){
  const [fetchedPlace, setFetchedPlace] = useState()
  function showOnMapHandler(){
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng
    }
    )
  }
  const selectedPlaceId = route.params.placeId
  useEffect(()=> {
    async function loadPlaceData(){
      const place = await fetchPlaceDetails(selectedPlaceId)
      setFetchedPlace(place)
      navigation.setOptions({
        title: place.title
      })
    }
    loadPlaceData()
  }, [selectedPlaceId])
  if(!fetchedPlace){
    return <View style={styles.fallBack}><Text>Loading Place Data ...</Text></View>
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>View on Map</OutlineButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    minHeight: 300
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})