import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors} from "../../constants/Colors"
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

export default function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [pickedLocation, setPickedlocation] = useState()
  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText)
  }
  function takeImageHandler(imageUri){
    setSelectedImage(imageUri)
  }
  const pickLocationhandler = useCallback((location) => {
    setPickedlocation(location)
  }, [])
  function savePlaceHandler(){
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
    console.log('Place Data:', placeData)
    onCreatePlace(placeData)
  }
  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationhandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  },
})