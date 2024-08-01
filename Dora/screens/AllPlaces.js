import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";


export default function AllPlaces({route}){
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(()=> {
    if (isFocused) {
      //console.log('Route Params:', route.params); 
      if (route.params && route.params.place) {
        console.log('Place:', route.params.place); 
        setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
      }
    }
  }, [isFocused, route])
  return (
    <PlacesList places={loadedPlaces}/>
  )
}