import LinkedList from '../../../../data-structures/linked-list/LinkedList';
import traversal from '../traversal';

describe('traversal', () => {
  it('should traverse linked list', () => {
    const linkedList = new LinkedList();

    linkedList
      .append(1)
      .append(2)
      .append(3);

    const traversedNodeValues:Array<number> = [];
    const traversalCallback = (nodeValue:number) => {
      traversedNodeValues.push(nodeValue);
    };

    traversal(linkedList, traversalCallback);

    expect(traversedNodeValues).toEqual([1, 2, 3]);
  });
});
