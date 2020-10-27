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
    <div>
      <DijkstraTraversal></DijkstraTraversal>
    </div>
  );
}
