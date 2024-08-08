export default ({ chosenType, value }: { chosenType: string; value: any }) => {
  if (chosenType === 'string') return typeof value === 'object' ? JSON.stringify(value) : value
  if (chosenType === 'object') return typeof value === 'string' ? JSON.parse(value) : value

  return value
}
