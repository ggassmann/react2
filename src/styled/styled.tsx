import * as React2 from '../index';
import { createElement } from '../createElement';

interface IStyledProps {
  style: any;
}

export const styled = (targetComponent: string) => (styledProps) => {
  console.log('started styled', styledProps);
  return (props) => {
    let compBase = createElement(targetComponent, props, ...props.children);
    return compBase
  };
}

console.log(React2);