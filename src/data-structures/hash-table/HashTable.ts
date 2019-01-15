import LinkedList from "../linked-list/LinkedList";

const defaultHashTableSize = 32;

export default class HashTable {
  buckets: Array<LinkedList>;
  keys: {
    [propName: string]: any
  };

  constructor(hashTableSize?: number) {
    this.buckets = Array(hashTableSize || defaultHashTableSize).fill(null).map(() => new LinkedList());

    this.keys = {};
  }

  hash(key: string): number {
    const hash = Array.from(key).reduce(
      (hasAccumulator, keySymbol) => hasAccumulator + keySymbol.charCodeAt(0),
      0,
    )

    return hash % this.buckets.length;
  }

  set(key: string, value: any) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  delete(key: string): any {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key: string):any {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue: any) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.keys, key);
  }

  getKeys(): Array<string> {
    return Object.keys(this.keys);
  }
}