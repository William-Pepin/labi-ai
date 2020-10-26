import React from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";

import { options600 } from "../Config/config";

/**
 * @Date 2020-10-26
 * @Author William Pépin 16434597
 * @Desc Classe permettant d'effectuer et d'affiché le parcours en profondeur d'un graph
 */
export default class DepthTraversal extends React.Component {
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
    this.time = 0;
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction à effectuer lorsque le composante React est bien instancié. Permet de commencer le parcour en profondeur.
   * @param null
   * @returns null
   */
  componentDidMount() {
    let startingNodeID = this.state.nodes[0].id;
    let visited = {};
    this.endingNodeID = 15;

    this.parcourGraphRecursive(startingNodeID, visited);
  }

  parcourGraphRecursive = (nodeID, visited) => {
    if (!visited[this.endingNodeID]) {
      this.time += 1000;
      visited[nodeID] = true;
      // met une belle couleur verte
      setTimeout(() => {
        this.setState((prevState) => ({
          nodes: prevState.nodes.map((prevNode) =>
            nodeID === prevNode.id ? { ...prevNode, color: "green" } : prevNode
          ),
        }));
      }, this.time);

      // Toutes les edges associés à cet element
      let nEdges = this.state.edges.filter(
        (edge) => edge.from === nodeID || edge.to === nodeID
      );

      nEdges.forEach((edge) => {
        let to;
        edge.from === nodeID ? (to = edge.to) : (to = edge.from);
        if (!visited[to]) {
          this.parcourGraphRecursive(to, visited);
        }
      });
    }
  };

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
