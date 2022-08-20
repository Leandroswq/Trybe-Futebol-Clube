export default function deepCopy(value){
  const copy = JSON.parse(JSON.stringify(value))
  
  return copy
}