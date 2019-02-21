export class Fiber {
  public state: any;
  public next?: Fiber;
  public clone() {
    let newOrigin = new Fiber();
    newOrigin.state = this.state;
    if(this.next) {
      newOrigin.next = this.next.clone();
    }
    return newOrigin;
  }
}