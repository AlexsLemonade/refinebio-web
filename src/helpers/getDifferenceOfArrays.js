import unionizeArrays from './unionizeArrays'
// equivalent to https://lodash.com/docs#difference
export default (targetArr, ...arrsToCompare) => {
  const mergedArrays = unionizeArrays(...arrsToCompare)

  return targetArr.filter((element) => !mergedArrays.includes(element))
}
