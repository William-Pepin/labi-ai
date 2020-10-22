export default class Node {
  id;
  group;
  data;

  constructor(id, data, group) {
    this.id = id;
    this.data = data;
    group ? (this.group = group) : (this.group = 0);
  }
}
