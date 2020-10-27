import React from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";
import PriorityQueue from "priorityqueuejs";

import { options600 } from "../Config/config";
import { curry } from "lodash";

/**
 * @Date 2020-10-26
 * @Author William Pépin 16434597
 * @Desc Classe permettant d'effectuer et d'affiché le parcours en profondeur d'un graph
 */
export default class DijkstraTraversal extends React.Component {
  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Constructeur permettant d'instancier la classe
   * @param props Propriétés React passé en paramètre dans la composante précédente.
   * @returns null
   */
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
        { weight: 1, from: 0, to: 1 },
        { weight: 1, from: 1, to: 2 },
        { weight: 1, from: 2, to: 5 },
        { weight: 1, from: 2, to: 3 },
        { weight: 1, from: 3, to: 4 },
        { weight: 1, from: 4, to: 6 },
        { weight: 1, from: 5, to: 9 },
        { weight: 1, from: 6, to: 11 },
        { weight: 1, from: 7, to: 8 },
        { weight: 1, from: 7, to: 12 },
        { weight: 1, from: 8, to: 9 },
        { weight: 1, from: 9, to: 10 },
        { weight: 1, from: 10, to: 11 },
        { weight: 1, from: 11, to: 13 },
        { weight: 1, from: 12, to: 14 },
        { weight: 1, from: 13, to: 18 },
        { weight: 1, from: 14, to: 15 },
        { weight: 1, from: 15, to: 16 },
        { weight: 1, from: 16, to: 17 },
        { weight: 1, from: 17, to: 18 },
      ],
    };
    this.pathStack = [];
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction à effectuer lorsque le composante React est bien instancié. Permet de commencer le parcour en profondeur.
   * @param null
   * @returns null
   */
  componentDidMount() {
    this.pathStack = this.getShortestPath(0, 15);

    this.runID = setInterval(() => this.parcourGraphRun(), 1000);
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction à effectuer lorsque le composante React arrête d'être affiché. Permet d'arrêter l'interval.
   * @param null
   * @returns null
   */
  componentWillUnmount() {
    clearInterval(this.runID);
  }

  getShortestPath(from, to) {
    let fromNode = this.state.nodes[from]; // Noeud de départ
    let distances = {}; // Table de distances { id : distance }
    let visited = {}; // Table de visités { id : bool }
    let previousNodes = {};

    this.state.nodes.forEach((node) => {
      distances[node.id] = Number.MAX_VALUE; // Valeur maximale des distances
    });
    distances[from] = 0; // Valeur 0 pour la première distance

    let queue = new PriorityQueue((a, b) => {
      return a[1] - b[1];
    });

    queue.enq([fromNode, 0]); // Priorité 0

    // Pendant que la liste n'est pas vide
    while (!queue.isEmpty()) {
      let [element, distance] = queue.deq(); // Sort l'élément prioritaire

      visited[element.id] = true; // Visite l'élément

      // Recherche toutes les edges associés
      let elementEdges = this.state.edges.filter(
        (edge) => edge.from === element.id || edge.to === element.id
      );

      // Pour chaque edge de l'élément
      elementEdges.forEach((edge) => {
        let to;
        edge.from === element.id ? (to = edge.to) : (to = edge.from); // Recherche le noeud associé

        // s'il n'est pas visité
        if (!visited[to]) {
          var newDistance = distances[element.id] + edge.weight; // Nouvelle distance

          if (newDistance < distances[to]) {
            distances[to] = newDistance; // Si plus petit
            previousNodes[to] = element;
            queue.enq([this.state.nodes[to], newDistance]);
          }
        }
      });
    }

    return this.buildStack(previousNodes, to);
  }

  buildStack(previousNodes, to) {
    let toNode = this.state.nodes[to]; // Noeud de fin
    let stack = [];

    stack.push(toNode);
    let previousNode = previousNodes[to];
    while (previousNode != null) {
      stack.push(previousNode);
      previousNode = previousNodes[previousNode.id];
    }
    return stack;
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction permettant d'effectuer un tour du parcours de graph
   * @param null
   * @returns null
   */
  parcourGraphRun() {
    // si la length du stack n'égale pas 0
    if (this.pathStack.length !== 0) {
      // sort le premier élément
      let element = this.pathStack.pop();

      // met une belle couleur verte
      this.setState((prevState) => ({
        nodes: prevState.nodes.map((node) =>
          node.id === element.id ? { ...node, color: "green" } : node
        ),
      }));
    } else {
      clearInterval(this.runID);
    }
  }

  /**
   * @Date 2020-10-15
   * @Author William Pépin
   * @Desc Fonction exécuté lorsque le composant est affiché ou actualisé.
   * @param null
   * @returns Un graph qui affiche au une seconde le parcours en largeur.
   */
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
