import BinarySearchTree from '../binary-search-tree/BinarySearchTree';
import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode';

export default class AvlTree extends BinarySearchTree {
  insert(value: any): BinarySearchTreeNode {
    const insertNode = super.insert(value);

    let currentNode = this.root.find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }

    return insertNode;
  }

  remove(value: any) {
    const removeStatus = super.remove(value);
    this.balance(this.root);

    return removeStatus;
  }

  balance(node: BinarySearchTreeNode) {
    
  }
}