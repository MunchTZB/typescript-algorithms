export default function permutateWithoutRepetitions(permutationOptions:Array<any>):Array<Array<any>> {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  const permutations = [];

  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

  const firstOption = permutationOptions[0];

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    for (let postionIndex = 0;postionIndex <= smallerPermutations.length; postionIndex += 1) {
      const permutationPrefix = smallerPermutations.slice(0, postionIndex);
      const permutationSuffix = smallerPermutations.slice(postionIndex);

      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
    }
  }

  return permutations;
}