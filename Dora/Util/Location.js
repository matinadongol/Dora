
const GOOGLE_API_KEY = "AIzaSyAOybTmJ8L0B_URAF38YgVTJHJou-pUieg"
export default function getMapPreview(lat, lng){
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewURL
}

