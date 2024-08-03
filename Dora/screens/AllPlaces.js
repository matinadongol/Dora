import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../Util/database";


export default function AllPlaces({route}){
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(()=> {
    async function loadPlaces(){
      const places = await fetchPlaces()
      setLoadedPlaces(places)
    }
    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused])
  return (
    <PlacesList places={loadedPlaces}/>
  )
}