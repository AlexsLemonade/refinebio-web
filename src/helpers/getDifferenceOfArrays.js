import { unionizeArrays } from './unionizeArrays'
// https://lodash.com/docs#difference
export const getDifferenceOfArrays = (targetArr, ...arrsToCompare) => {
  const mergedArrays = unionizeArrays(...arrsToCompare)

  return targetArr.filter((element) => !mergedArrays.includes(element))
}
