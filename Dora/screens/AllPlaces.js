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
      //console.log('Route Params:', route.params); 
      // if (route.params && route.params.place) {
      //   //console.log('Place:', route.params.place); 
      //   setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
      // }
      loadPlaces()
    }
  }, [isFocused])
  return (
    <PlacesList places={loadedPlaces}/>
  )
}