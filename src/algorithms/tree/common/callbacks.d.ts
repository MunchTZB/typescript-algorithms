import BinaryTreeNode from '../../../data-structures/tree/BinaryTreeNode';

interface allowTraversalFunction {
  (node:BinaryTreeNode, child: BinaryTreeNode): boolean;
}

interface nodeFunction {
  (node:BinaryTreeNode): void;
}

export default interface Callbacks {
  allowTraversal?: allowTraversalFunction;
  enterNode?: nodeFunction;
  leaveNode?: nodeFunction;
}
