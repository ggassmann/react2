export interface IFiber {
  state: any;
  next?: IFiber;
}