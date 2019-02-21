import { IFiber } from "./IFiber";

export interface IVNode {
  type: 'native';
  tagName: (...any) => any | object | string | any;
  attributes,
  children: (IVNode | string)[];
  key?: string;
  previousFiber?: IFiber;
}