import LinkedList from '../linked-list/LinkedList';
import GraphEdge from './GraphEdge';
import LinkedListNode from '../linked-list/LinkedListNode';

export default class GraphVertex {
  value: any;
  edges: LinkedList;

  constructor(value?: any) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    }

    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  addEdge(edge: GraphEdge): GraphVertex {
    this.edges.append(edge);

    return this;
  }

  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge);
  }

  getNeighbors(): Array<GraphVertex> {
    const edges = this.edges.toArray();

    const neighborsConverter = (node: LinkedListNode) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    }

    return edges.map(neighborsConverter);
  }

  getEdges(): Array<GraphEdge> {
    return this.edges.toArray().map(node => node.value);
  }

  getDegree() {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge: GraphEdge) {
    const edgeNode = this.edges.find({
      callback: (edge: any) => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  hasNeighbor(vertex: GraphVertex) {
    const vertexNode = this.edges.find({
      callback: (edge: any) => edge.startVertex === vertex || edge.endVertex === vertex
    });

    return !!vertexNode;
  }

  findEdge(vertex: GraphVertex): GraphEdge | null {
    const edgeFinder = (edge: GraphEdge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    }

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey(): string {
    return this.value;
  }

  deleteAllEdges(): GraphVertex {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  toString(callback?: Function): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}