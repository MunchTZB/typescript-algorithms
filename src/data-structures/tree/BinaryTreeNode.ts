import HashTable from '../hash-table/HashTable';
import Comparator from '../../utils/Comparator';

export default class BinaryTreeNode {
  left: BinaryTreeNode;
  right: BinaryTreeNode;
  parent: BinaryTreeNode;
  nodeComparator: Comparator;
  meta: HashTable;
  value: any;

  constructor(value: any = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.meta = new HashTable();

    this.nodeComparator = new Comparator();
  }

  // leftHeight 和 rightHeight 以及 height 是个递归的过程；
  get leftHeight() {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get uncle(): BinaryTreeNode {
    if (!this.parent) {
      return undefined;
    }

    if (!this.parent.parent) {
      return undefined;
    }

    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined;
    }

    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      return this.parent.parent.right;
    }

    return this.parent.parent.left;
  }

  setValue(value: any): BinaryTreeNode {
    this.value = value;

    return this;
  }

  setLeft(node: BinaryTreeNode): BinaryTreeNode {
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node: BinaryTreeNode): BinaryTreeNode {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  removeChild(nodeToRemove: BinaryTreeNode) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(nodeToReplace: BinaryTreeNode, replacementNode: BinaryTreeNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.setLeft(replacementNode);
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.setRight(replacementNode);
      return true;
    }

    return false;
  }

  static copyNode(sourceNode: BinaryTreeNode, targetNode: BinaryTreeNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder(): Array<any> {
    let traverse: Array<any> = [];
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    traverse.push(this.value);

    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}