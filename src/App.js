import React from "react";
import BreadthTraversal from "./Components/BreadthTraversal";
import DepthTraversal from "./Components/DepthTraversal";
import DepthTraversalRecursive from "./Components/DepthTraversalRecursive";
import DijkstraTraversal from "./Components/DijkstraTraversal";
import DijkstraTraversalAlternative from "./Components/DijkstraTraversalAlternative";

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
        <h1>Maze 1 original</h1>
        <DijkstraTraversal startingID={0} endingID={15}></DijkstraTraversal>
      </div>
      <div>
        <h1>Maze 1 path 2</h1>
        <DijkstraTraversal startingID={4} endingID={0}></DijkstraTraversal>
      </div>
      <div>
        <h1>Maze 1 path 3</h1>
        <DijkstraTraversal startingID={3} endingID={14}></DijkstraTraversal>
      </div>

      <div>
        <h1>Maze 2 path 1</h1>
        <DijkstraTraversalAlternative
          startingID={0}
          endingID={13}
        ></DijkstraTraversalAlternative>
      </div>

      <div>
        <h1>Dijkstra alternative</h1>
        <DijkstraTraversalAlternative
          startingID={9}
          endingID={15}
        ></DijkstraTraversalAlternative>
      </div>

      <div>
        <h1>Dijkstra alternative</h1>
        <DijkstraTraversalAlternative
          startingID={9}
          endingID={6}
        ></DijkstraTraversalAlternative>
      </div>
    </div>
  );
}
const styles = {
  app: {
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    maxHeight: "100vh",
  },
};
