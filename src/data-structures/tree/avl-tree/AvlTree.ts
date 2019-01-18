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
    if (node.balanceFactor > 1) {
      if (node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(rootNode: BinarySearchTreeNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      this.root = leftNode;
    }

    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    leftNode.setRight(rootNode);
  }

  rotateLeftRight(rootNode: BinarySearchTreeNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    rootNode.setLeft(leftRightNode);

    leftRightNode.setLeft(leftNode);

    this.rotateLeftLeft(rootNode);
  }

  rotateRightRight(rootNode: BinarySearchTreeNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      this.root = rightNode;
    }

    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    rightNode.setLeft(rootNode);
  }

  rotateRightLeft(rootNode: BinarySearchTreeNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    rootNode.setRight(rightLeftNode);

    rightLeftNode.setRight(rightNode);

    this.rotateRightRight(rootNode);
  }
}