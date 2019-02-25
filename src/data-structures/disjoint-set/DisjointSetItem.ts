export default class DisjointSetItem {
  value: any;
  keyCallback: Function;
  parent: null | DisjointSetItem;
  children: Map<any, DisjointSetItem>;

  constructor(value: any, keyCallback?: Function) {
    this.value = value;
    this.keyCallback = keyCallback;
    this.parent = null;
    this.children = new Map();
  }

  getKey():any {
    if (this.keyCallback) {
      return this.keyCallback(this.value);
    }

    return this.value;
  }

  getRoot(): DisjointSetItem {
    return this.isRoot() ? this : this.parent.getRoot();
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  getRank(): number {
    if (this.children.size === 0) {
      return 0;
    }

    let rank = 0;

    this.getChildren().forEach(child => {
      rank += 1;
      
      rank += child.getRank();
    });

    return rank;
  }

  getChildren(): Array<DisjointSetItem> {
    return [...this.children.values()];
  }

  setParent(
    parentItem: DisjointSetItem,
    forceSettingParentChild: boolean = true
  ): DisjointSetItem {
    this.parent = parentItem;
    if (forceSettingParentChild) {
      parentItem.addChild(this);
    }

    return this;
  }

  addChild(childItem: DisjointSetItem): DisjointSetItem {
    this.children.set(childItem.getKey(), childItem);
    childItem.setParent(this, false);

    return this;
  }
}