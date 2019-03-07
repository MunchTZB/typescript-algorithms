import Comparator from '../../../utils/Comparator';

export default function jumpSearch(sortedArray:Array<any>, seekElement:any, comparatorCallback:Function) {
  const comparator = new Comparator(comparatorCallback);
  const arraySize = sortedArray.length;

  if (!arraySize) {
    return -1;
  }

  const jumpSize = Math.floor(Math.sqrt(arraySize));

  let blockStart = 0;
  let blockEnd = jumpSize;

  while (comparator.greaterThan(seekElement, sortedArray[Math.min(blockEnd, arraySize) - 1])) {
    blockStart = blockEnd;
    blockEnd += jumpSize;

    if (blockStart > arraySize) {
      return -1;
    }
  }

  let currentIndex = blockStart;
  while (currentIndex < Math.min(blockEnd, arraySize)) {
    if (comparator.equal(sortedArray[currentIndex], seekElement)) {
      return currentIndex;
    }

    currentIndex += 1;
  }

  return -1;
}