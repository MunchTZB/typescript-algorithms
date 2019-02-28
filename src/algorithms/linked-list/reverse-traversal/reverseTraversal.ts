import LinkedListNode from '../../../data-structures/linked-list/LinkedListNode';
import LinkedList from '../../../data-structures/linked-list/LinkedList';

function reverseTraversalRecursive(node:LinkedListNode, callback:Function) {
  if (node) {
    reverseTraversalRecursive(node.next, callback);
    callback(node.value);
  }
}

export default function reverseTraversal(linkedList:LinkedList, callback:Function) {
  reverseTraversalRecursive(linkedList.head, callback);
}