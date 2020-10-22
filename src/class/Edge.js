export default class Edge {
  from;
  to;
  weight;

  /**
   * @Date 2020-10-15
   * @Author William Pépin
   * @Desc Constructeur permettant d'instancier les deux variables de l'arrête (edge).
   * @param from Noeud de départ
   * @param to Noeud de destination
   * @returns null
   */
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}
