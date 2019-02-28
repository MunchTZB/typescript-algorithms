import LinkedList from '../../../data-structures/linked-list/LinkedList';

export default function traversal(linkedList: LinkedList, callback: Function) {
  let currentNode = linkedList.head;

  while (currentNode) {
    callback(currentNode.value);
    currentNode = currentNode.next;
  }
}