
const GOOGLE_API_KEY = "AIzaSyAOybTmJ8L0B_URAF38YgVTJHJou-pUieg"

export function getMapPreview(lat, lng){
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewURL
}

export async function getAddress(lat, lng){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url)
  if(!response.ok){
    throw new Error('failed to fetch address!')
  }
  const data = await response.json()
  const address = data.results[0].formatted_address
  return address
}