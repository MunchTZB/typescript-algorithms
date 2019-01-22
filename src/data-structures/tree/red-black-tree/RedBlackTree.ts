import BinarySearchTree from '../binary-search-tree/BinarySearchTree';
import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode';
import BinaryTreeNode from '../BinaryTreeNode';

const RED_BLACK_TREE_COLORS = {
  red: Symbol('red'),
  black: Symbol('black'),
};

const COLOR_PROP_NAME = 'color';

export default class RedBlackTree extends BinarySearchTree {
  insert(value):BinarySearchTreeNode {
    const insertedNode = super.insert(value);

    if (this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode);
    } else {
      this.makeNodeRed(insertedNode);
    }

    this.balance(insertedNode);

    return insertedNode;
  }

  remove(value: any):boolean {
    throw new Error(`Can't remove ${value}. Remove method is not implemented yet`)
  }

  balance(node: BinarySearchTreeNode) {
    if (this.nodeComparator.equal(node, this.root)) {
      return;
    }

    if (this.isNodeBlack(node.parent)) {
      return;
    }

    const grandParent = node.parent.parent;

    if (node.uncle && this.isNodeRed(node.uncle)) {
      this.makeNodeBlack(node.value);
      this.makeNodeBlack(node.parent);

      if (!this.nodeComparator.equal(grandParent, this.root)) {
        this.makeNodeRed(grandParent);
      } else {
        return;
      }

      this.balance(grandParent);
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      if (grandParent) {
        let newGrandParent;

        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          if (this.nodeComparator.equal(node.parent.left, node)) {
            
          }
        }
      }
    }
  }

  leftLeftRotation(grandParentNode: BinarySearchTreeNode):BinarySearchTreeNode {
    const grandGrandParent = grandParentNode.parent;

    let grandParentNodeIsLeft;
    if (grandParentNode) {
      grandParentNodeIsLeft = this.nodeComparator.equal(grandGrandParent.left, grandParentNode);
    }

    const parentNode = grandParentNode.left;

    const parentRightNode = parentNode.right;

    parentNode.setRight(grandParentNode);

    grandGrandParent.setLeft(parentRightNode);

    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode);
      } else {
        grandGrandParent.setRight(parentNode);
      }
    } else {
      parentNode.parent = null;
    }

    this.swapNodeColors(parentNode, grandParentNode);

    return parentNode;
  }

  makeNodeRed(node: BinarySearchTreeNode): BinarySearchTreeNode {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red);

    return node;
  }

  makeNodeBlack(node: BinarySearchTreeNode): BinarySearchTreeNode {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black);

    return node;
  }

  isNodeRed(node: BinarySearchTreeNode) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red;
  }

  isNodeBlack(node: BinarySearchTreeNode) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black;
  }

  isNodeColored(node: BinarySearchTreeNode) {
    return this.isNodeRed(node) || this.isNodeBlack(node);
  }

  swapNodeColors(firstNode: BinarySearchTreeNode, secondNode: BinarySearchTreeNode) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME);
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME);

    firstNode.meta.set(COLOR_PROP_NAME, secondColor);
    secondNode.meta.set(COLOR_PROP_NAME, firstColor);
  }
}