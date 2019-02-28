import Callbacks from '../common/callbacks';
import BinaryTreeNode from '../../../data-structures/tree/BinaryTreeNode';

function initCallbacks(callbacks:Callbacks = {}):Callbacks {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};
  const defaultAllowTraversal = () => true;

  initiatedCallback.allowTraversal = callbacks.allowTraversal || defaultAllowTraversal;
  initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

  return initiatedCallback;
}

export function depthFirstSearchRecursive(node:BinaryTreeNode, callbacks:Callbacks) {
  callbacks.enterNode(node);

  if (node.left && callbacks.allowTraversal(node, node.left)) {
    depthFirstSearchRecursive(node.left, callbacks);
  }

  if (node.right && callbacks.allowTraversal(node, node.right)) {
    depthFirstSearchRecursive(node.right, callbacks);
  }

  callbacks.leaveNode(node);
}

export default function depthFirstSearch(rootNode:BinaryTreeNode, callbacks:Callbacks = {}) {
  depthFirstSearchRecursive(rootNode, initCallbacks(callbacks));
}