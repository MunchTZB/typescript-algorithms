function btPowerSetRecursive(originalSet:Array<any>, allSubsets:Array<Array<any>> = [[]], currentSubset: Array<any> = [], startAt:number = 0) {
  for (let position = startAt; position < originalSet.length; position += 1) {
    currentSubset.push(originalSet[position]);

    allSubsets.push([...currentSubset]);

    btPowerSetRecursive(originalSet, allSubsets, currentSubset, position + 1);

    currentSubset.pop();
  }

  return allSubsets;
}

export default function btPowerSet(originalSet:Array<any>) {
  return btPowerSetRecursive(originalSet);
}