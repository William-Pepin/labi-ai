import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "react-graph-vis";
import AppGraph from "./Class/Graph";
import Node from "./Class/Node";
import Edge from "./Class/Edge";

import { options600 } from "./Config/config";
import { render } from "@testing-library/react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [
        { id: 0, x: 0, y: 0, color: "blue" },
        { id: 1, x: 0, y: 100, color: "yellow" },
        { id: 2, x: 0, y: 200, color: "yellow" },
        { id: 3, x: 0, y: 300, color: "yellow" },
        { id: 4, x: 0, y: 400, color: "yellow" },
        { id: 5, x: 100, y: 200, color: "yellow" },
        { id: 6, x: 100, y: 400, color: "yellow" },
        { id: 7, x: 200, y: 0, color: "yellow" },
        { id: 8, x: 200, y: 100, color: "yellow" },
        { id: 9, x: 200, y: 200, color: "yellow" },
        { id: 10, x: 200, y: 300, color: "yellow" },
        { id: 11, x: 200, y: 400, color: "yellow" },
        { id: 12, x: 300, y: 0, color: "yellow" },
        { id: 13, x: 300, y: 400, color: "yellow" },
        { id: 14, x: 400, y: 0, color: "yellow" },
        { id: 15, x: 400, y: 100, color: "red" },
        { id: 16, x: 400, y: 200, color: "yellow" },
        { id: 17, x: 400, y: 300, color: "yellow" },
        { id: 18, x: 400, y: 400, color: "yellow" },
      ],
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 5 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 6 },
        { from: 5, to: 9 },
        { from: 6, to: 11 },
        { from: 7, to: 8 },
        { from: 7, to: 12 },
        { from: 8, to: 9 },
        { from: 9, to: 10 },
        { from: 10, to: 11 },
        { from: 11, to: 13 },
        { from: 12, to: 14 },
        { from: 13, to: 18 },
        { from: 14, to: 15 },
        { from: 15, to: 16 },
        { from: 16, to: 17 },
        { from: 17, to: 18 },
      ],
    };
    this.queue = [];
    this.visited = {};
    this.endingNodeID = undefined;
  }

  componentDidMount() {
    this.queue.push(this.state.nodes[0]); // Starting node
    this.visited[this.state.nodes[0].id] = true;
    this.endingNodeID = 15;
    this.runID = setInterval(() => this.parcourGraphRun(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.runID);
  }

  parcourGraphRun() {
    // si la length de la queue n'égale pas 0
    if (!this.visited[this.endingNodeID]) {
      if (this.queue.length !== 0) {
        // sort le premier élément
        let element = this.queue.shift();
        // Toutes les edges associés à cet element
        let elementEdges = this.state.edges.filter(
          (edge) => edge.from === element.id || edge.to === element.id
        );

        // Pour chaque edge de l'élément
        elementEdges.forEach((edge) => {
          // Recherche du noeud associé
          let to;
          edge.from === element.id ? (to = edge.to) : (to = edge.from);

          // s'il n'est pas visité
          if (!this.visited[to]) {
            this.visited[to] = true;
            // Ajout du noeud dans la queue
            this.queue.push(this.state.nodes[to]);
          }
        });

        let newNodes = this.state.nodes;
        newNodes[element.id].color = "green";
        this.setState({ nodes: newNodes });
      }
    } else {
      // met une belle couleur verte
      let newNodes = this.state.nodes;
      newNodes[this.endingNodeID].color = "green";
      this.setState({ nodes: newNodes });
    }
  }

  render() {
    return (
      <div>
        <Graph
          key={uuidv4()}
          graph={{ nodes: this.state.nodes, edges: this.state.edges }}
          options={options600}
        />
      </div>
    );
  }
}

//function parcourGraph(startingindex) {
//  let tempGraph = graph;
//  let visited = {};
//  let queue = [];
//
//  visited[startingindex] = true;
//  queue.push(startingindex);
//
//  while (!queue.length === 0) {
//    let element = queue.shift();
//    console.log("ok");
//
//    let elementEdges = graph.edges.filter(
//      (edge) => edge.from === element.id || edge.to === element.id
//    );
//
//    elementEdges.forEach((edge) => {
//      let to;
//      edge.from === element.id ? (to = edge.to) : (to = edge.from);
//      visited[to] = true;
//
//      queue.push(tempGraph.nodes[to]);
//
//      tempGraph.nodes[to].group = 3;
//      sleep(1000);
//      setGraph(tempGraph);
//    });
//  }
//}