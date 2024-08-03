import { Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../Util/database";

export default function AddPlaces({navigation}){
  async function createPlaceHandler(place){
    //console.log("Creating place:", place)
    try {
      await insertPlace(place);
      navigation.navigate('AllPlaces');
    } catch (error) {
      console.error("Error inserting place:", error);
    }
  }
  return (
  <>
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  </>
  )
}