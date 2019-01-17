import BinaryTreeNode from '../BinaryTreeNode';
import Comparator from '../../../utils/Comparator';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  compareFunction?: Function;
  nodeValueComparator: Comparator;
  left: BinarySearchTreeNode;
  right: BinarySearchTreeNode;
  parent: BinarySearchTreeNode;

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

  remove(value: any): boolean {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 是个没有子节点的叶子节点
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();
      // 这里有点绕 首先 nextBiggerNode肯定没有左节点
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        // 如果nextBiggerNode不是右节点，那么删除这个节点，赋值到此节点就行
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // 如果nextBiggerNode就是右节点 那么这个节点肯定没有 用右节点替换该节点就好了
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    nodeToRemove.parent = null;

    return true;
  }

  findMin(): BinarySearchTreeNode {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}