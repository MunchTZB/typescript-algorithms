export default function cartesianProduct(setA:Array<any>, setB:Array<any>):Array<Array<any>> {
  if (!setA || !setB || !setA.length || !setB.length) {
    return null;
  }

  const product:Array<Array<any>> = [];

  for (let indexA = 0; indexA < setA.length; indexA += 1) {
    for (let indexB = 0; indexB < setB.length; indexB += 1) {
      product.push([setA[indexA], setB[indexB]]);
    }
  }

  return product;
}