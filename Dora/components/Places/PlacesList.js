import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({places}){
  const navigation = useNavigation()
  function selectPlaceHandler(id){
    navigation.navigate('PlaceDetails',{
      placeId: id
    })
  }
  if(!places || places.length === 0){
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No places added yet - start adding some!</Text>
      </View>
    )
  }
  return (
    <>
      <FlatList 
        style={styles.list}
        data={places} 
        keyExtractor={(item) => item.id} 
        renderItem={(item) => <PlaceItem place={item.item} onSelect={selectPlaceHandler}/>}/>
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallBackText: {
    fontSize: 18,
    color: Colors.primary200
  }
})