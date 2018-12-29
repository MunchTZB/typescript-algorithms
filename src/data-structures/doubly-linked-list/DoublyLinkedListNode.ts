export default class DoublyLinkedListNode {
  value: any;
  next: DoublyLinkedListNode;
  previous: DoublyLinkedListNode;

  constructor(value: any, next?: DoublyLinkedListNode, previous?: DoublyLinkedListNode ) {
    this.value = value;
    this.next = next || null;
    this.previous = previous || null;
  }

  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}