import BinarySearchTreeNode from './BinarySearchTreeNode';
import Comparator from '../../../utils/Comparator';

export default class BinarySearchTree {
  root: BinarySearchTreeNode;
  nodeComparator: Comparator;
  
  constructor(nodeValueCompareFunction?: Function) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

    this.nodeComparator = this.root.nodeComparator;
  }

  insert(value: any) {
    return this.root.insert(value);
  }

  contains(value: any) {
    return this.root.contains(value);
  }

  remove(value: any) {
    return this.root.remove(value);
  }

  toString() {
    return this.root.toString();
  }
}