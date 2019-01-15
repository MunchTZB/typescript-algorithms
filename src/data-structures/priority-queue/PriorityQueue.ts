import MinHeap from "../heap/MinHeap";
import Comparator from "../../utils/Comparator";

export default class PriorityQueue extends MinHeap {
  priorities: Map<any, any>;

  constructor() {
    super();
    this.priorities = new Map();
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  add(item: any, priority: number = 0): PriorityQueue {
    this.priorities.set(item, priority);
    super.add(item);

    return this;
  }

  remove(item: any, customFindingComparator?: Comparator): PriorityQueue {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);

    return this;
  }

  changePriority(item: any, priority: number): PriorityQueue {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

    return this;
  }

  findByValue(item: any) {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item: any) {
    return this.findByValue(item).length > 0;
  }

  comparePriority(a: any, b: any): number {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }

    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }
}