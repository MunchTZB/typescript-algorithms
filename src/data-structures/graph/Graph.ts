import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";

export default class Graph {
  vertices: Map<string, GraphVertex>;
  edges: Map<string, GraphEdge>;
  isDirected: boolean;

  constructor(isDirected = false) {
    this.vertices = new Map();
    this.edges = new Map();
    this.isDirected = isDirected;
  }

  addVertex(newVertex: GraphVertex): Graph {
    this.vertices.set(newVertex.getKey(), newVertex);

    return this;
  }

  getVertexByKey(vertexKey: string) {
    return this.vertices.get(vertexKey);
  }

  getNeighbors(vertex: GraphVertex) {
    return vertex.getNeighbors();
  }

  getAllVertices() {
    return [...this.vertices.values()];
  }

  getAllEdges() {
    return [...this.edges.values()];
  }

  addEdge(edge: GraphEdge): Graph {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    if (this.edges.has(edge.getKey())) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges.set(edge.getKey(), edge);
    }

    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge: GraphEdge) {
    if (this.edges.get(edge.getKey())) {
      this.edges.delete(edge.getKey());
    } else {
      throw new Error('Edge not found in graph');
    }

    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex: GraphVertex, endVertex: GraphVertex): GraphEdge | null {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0)
  }

  reverse(): Graph {
    this.getAllEdges().forEach(edge => {
      this.deleteEdge(edge);

      edge.reverse();

      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices(): Map<string, number> {
    const verticesIndices: Map<string, number> = new Map();

    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices.set(vertex.getKey(), index);
    });

    return verticesIndices;
  }

  getAdjacencyMatrix(): Array<Array<any>> {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    })

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices.get(neighbor.getKey());
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return [...this.vertices.keys()].toString();
  }
}