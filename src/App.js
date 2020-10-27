import React from "react";
import BreadthTraversal from "./Components/BreadthTraversal";
import DepthTraversal from "./Components/DepthTraversal";
import DepthTraversalRecursive from "./Components/DepthTraversalRecursive";
import DijkstraTraversal from "./Components/DijkstraTraversal";

/**
 * @Date 2020-10-26
 * @Author William Pépin
 * @Desc Fonction permettant d'afficher à l'écran
 * @param null
 * @returns Le composante désiré
 */
export default function App() {
  return (
    <div style={styles.app}>
      <div>
        <h1>Breadth</h1>
        <BreadthTraversal></BreadthTraversal>
      </div>
      <div>
        <h1>Depth</h1>
        <DepthTraversal></DepthTraversal>
      </div>
      <div>
        <h1>Depth Recursive</h1>
        <DepthTraversalRecursive></DepthTraversalRecursive>
      </div>
      <div>
        <h1>Dijkstra</h1>
        <DijkstraTraversal></DijkstraTraversal>
      </div>
    </div>
  );
}
const styles = {
  app: {
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
};
