export default function deepCopy(value: any){
  const copy = JSON.parse(JSON.stringify(value))
  
  return copy
}