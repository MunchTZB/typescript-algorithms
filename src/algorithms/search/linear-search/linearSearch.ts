import Comparator from '../../../utils/Comparator';

export default function linearSearch(array:Array<any>, seekElement:any, comparatorCallback?:Function):Array<number> {
  const comparator = new Comparator(comparatorCallback);
  const foundIndices:Array<number> = [];

  array.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}