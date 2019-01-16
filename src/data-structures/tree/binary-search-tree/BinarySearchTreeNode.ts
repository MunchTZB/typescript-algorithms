import BinaryTreeNode from '../BinaryTreeNode';
import Comparator from '../../../utils/Comparator';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  compareFunction?: Function;
  nodeValueComparator: Comparator;
  left: BinarySearchTreeNode;
  right: BinarySearchTreeNode;

  constructor(value: any = null, compareFunction?: Function) {
    super(value);

    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator(compareFunction);
  }

  insert(value: any): BinarySearchTreeNode {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value: any): BinarySearchTreeNode {
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      return this.left.find(value);
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  contains(value: any) {
    return !!this.find(value);
  }
}