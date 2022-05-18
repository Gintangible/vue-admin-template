export default function isDataInArray(array, data, key = 'id') {
  return array.some((item) => item[key] === data[key]);
}
