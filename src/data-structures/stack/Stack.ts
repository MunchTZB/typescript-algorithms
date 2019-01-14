import LinkedList from "../linked-list/LinkedList";

export default class Stack {
  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): any {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  push(value: any) {
    this.linkedList.prepend(value);
  }

  pop(): any {
    const removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead.value : null;
  }

  toArray(): Array<any> {
    return this.linkedList
      .toArray()
      .map(node => node.value);
  }

  toString(callback?: Function) {
    return this.linkedList.toString(callback);
  }
}