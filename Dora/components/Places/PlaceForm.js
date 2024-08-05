import { useCallback, useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors} from "../../constants/Colors"
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
})

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
  async function savePlaceHandler() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
        return;
      }
    }
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    console.log('Place Data:', placeData);
    onCreatePlace(placeData);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Your favorite place',
          body: 'Don\'t go cause you are broke',
          data: { username: 'Matina' }
        },
        trigger: {
          seconds: 5
        }
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
  function sendPushNotification() {
    fetch('...', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[...]',
        title: 'Test - sent from a device',
        body: 'This is a test'
      })
    })
  }
  useEffect(() => {
    async function configurePushNotifications(){
      const {status} = await Notifications.getPermissionsAsync()
      let finalStatus = status
      if(finalStatus !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if(finalStatus !== 'granted'){
        Alert.alert('Permission required', 'Push notification needs an appropriate permissions')
        return
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      console.log(pushTokenData)
      if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    }
    configurePushNotifications()
  }, [])
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received")
      console.log(notification)
      const userName = notification.request.content.data.username
      console.log(userName)
    })
    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response received")
      console.log(response)
    })
    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  }, [])
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