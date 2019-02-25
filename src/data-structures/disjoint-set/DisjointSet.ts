import DisjointSetItem from './DisjointSetItem';

export default class DisjointSet {
  keyCallback: Function;
  items: Map<any, DisjointSetItem>;

  constructor(keyCallback?: Function) {
    this.keyCallback = keyCallback;
    this.items = new Map();
  }

  makeSet(itemValue: any): DisjointSet {
    const disjointSetitem = new DisjointSetItem(itemValue, this.keyCallback);

    if (!this.items.has(disjointSetitem.getKey())) {
      this.items.set(disjointSetitem.getKey(), disjointSetitem);
    }

    return this;
  }

  find(itemValue: any): string|null {
    const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

    if (!this.items.has(templateDisjointItem.getKey())) {
      return null;
    }

    return this.items.get(templateDisjointItem.getKey()).getRoot().getKey();
  }

  union(valueA: any, valueB: any):DisjointSet {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets');
    }

    if (rootKeyA === rootKeyB) {
      return this;
    }

    const rootA = this.items.get(rootKeyA);
    const rootB = this.items.get(rootKeyB);

    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA);

      return this;
    }

    rootA.addChild(rootB);

    return this;
  }

  inSameSet(valueA: any, valueB: any) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets');
    }

    return rootKeyA === rootKeyB;
  }
}