import Comparator from '../../../utils/Comparator';

export default function interpolationSearch(sortedArray:Array<any>,seekElement:any, comparatorCallback:Function) {
  const comparator = new Comparator(comparatorCallback);

  let leftIndex = 0;
  let rightIndex = sortedArray.length - 1;

  while (leftIndex <= rightIndex) {
    const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex];
    const indexDelta = rightIndex - leftIndex;
    const valueDelta = seekElement - sortedArray[leftIndex];

    if (valueDelta < 0) {
      return -1;
    }

    if (!rangeDelta) {
      return sortedArray[leftIndex] === seekElement ? leftIndex : -1;
    }

    const middleIndex = leftIndex + Math.floor(valueDelta * indexDelta / rangeDelta);

    if (comparator.equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }
    
    if (comparator.lessThan(sortedArray[middleIndex], seekElement)) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
}