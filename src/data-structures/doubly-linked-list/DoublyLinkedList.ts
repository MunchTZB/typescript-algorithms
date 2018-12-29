import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/Comparator';
import FindParams from '../common/FindParams';

export default class DoublyLinkedList {
  head: DoublyLinkedListNode;
  tail: DoublyLinkedListNode;
  compare: Comparator;

  constructor(comparatorFunction?: Function) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: any): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;

    newNode.previous = this.tail;

    this.tail = newNode;

    return this;
  }

  delete(value: any): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(value, currentNode.value)) {
        deleteNode = currentNode;

        if (deleteNode === this.head) {
          this.head = this.head.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (deleteNode === this.tail) {
            this.tail = null;
          }
        } else if (deleteNode === this.tail) {
          this.tail = deleteNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = deleteNode.previous,
            nextNode = deleteNode.next;
          
            previousNode.next = nextNode;
            nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deleteNode;
  }

  find(findParams: FindParams): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (findParams.callback && findParams.callback(currentNode.value)) {
        return currentNode;
      }

      if (findParams.value !== undefined && this.compare.equal(currentNode.value, findParams.value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): DoublyLinkedListNode {
    if (!this.tail) {
      return null;
    }

    if (this.head === this.tail) {
      const deleteTail = this.tail;
      this.head = this.tail = null;

      return deleteTail;
    }

    const deleteTail = this.tail;

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deleteTail;
  }

  deleteHead(): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      const deleteTail = this.tail;
      this.head = this.tail = null;

      return deleteTail;
    }

    const deleteHead = this.head;

    this.head = this.head.next;
    this.head.previous = null;

    return deleteHead;
  }

  toArray(): Array<DoublyLinkedListNode> {
    const nodes = [];
    
    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  fromArray(values: Array<any>): DoublyLinkedList {
    values.forEach(value => this.append(value));

    return this;
  }

  toString(callback?: Function) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      prevNode = currentNode.previous;
      nextNode = currentNode.next;

      currentNode.next = prevNode;
      currentNode.previous = nextNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}