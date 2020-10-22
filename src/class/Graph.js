import _ from "lodash";
import Node from "./Node";
import Edge from "./Edge";

export default class Graph {
  nodes = [];
  edges = [];
  start;
  finish;

  constructor(nodes, edges) {
    nodes && (this.nodes = _.cloneDeep(nodes));
    edges && (this.edges = _.cloneDeep(edges));
  }

  addNode(n) {
    this.nodes.push(_.cloneDeep(n));
  }

  addEdge(from, to) {
    this.edges.push(new Edge(from, to));
  }

  labelStart(i) {}

  labelEnd(i) {}

  // breath(startingNode) {
  //   let visited = {};
  //
  //   let queue = [];
  //
  //   visited[startingNode.id] = true;
  //   queue.push(startingNode);
  //   startingNode.group = 2;
  //
  //   while (!queue.length === 0) {
  //     let element = queue.shift();
  //
  //     console.log(element);
  //
  //     elementEdges = edges.filter((edge) => edge.from === element.id);
  //
  //     for (edge in elementEdges) {
  //       if (!visited[edge.to]) {
  //         visited[edge.to];
  //         nodes[edge.from].group = 1;
  //         queue.push(nodes[edge.to]);
  //       }
  //     }
  //   }
  // }
  reset() {}
}
