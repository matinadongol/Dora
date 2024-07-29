import { Image, Pressable, Text, View } from "react-native";

export default function PlaceItem({place, onSelect}){
  return(
    <>
      <Pressable onPress={onSelect}>
        <Image source={{uri: place.imageUri}}/>
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </Pressable>
    </>
  )
}