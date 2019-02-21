import isString from '@f/is-string'

import { IVNode } from "./lib/IVNode";
import { isNumber, isFunction, isNull } from 'util';
import { resolveDispatcher, HookDispatcher, setDispatcher, cleanupDispatcher } from './hookDispatcher';
import { Fiber } from './lib/Fiber';

export const update = async(domElement: HTMLElement, node: IVNode, fiber: Fiber) => {
  console.log('got update with new fiber', fiber);
  node.currentFiber = fiber;
  setDispatcher(new HookDispatcher());
  let newNode = await create(node);
  cleanupDispatcher();
  domElement.replaceWith(newNode);
}

export const create = async (node: IVNode): Promise<HTMLElement> => {
  console.log('Creating node', node);
  let tagName = node.tagName;
  let stringifiedTagName: string = '';
  let builtNode = node;
  let element: HTMLElement;
  if(!isString(tagName)) {
    if(!isNumber(tagName)) {
      if(isFunction(tagName)) {
        let dispatcher = resolveDispatcher()

        dispatcher.startHooks((fiber: Fiber) => update(element, node, fiber), node.currentFiber);
        builtNode = tagName();
        node.currentFiber = dispatcher.finishHooks();

        stringifiedTagName = builtNode.tagName as unknown as string;
      } else {
        console.log(node);
      }
    } else {
      stringifiedTagName = builtNode.tagName.toString();
    }
  } else {
    stringifiedTagName = tagName as unknown as string;
  }

  element = document.createElement(stringifiedTagName);
  if(builtNode.attributes.onClick) {
    element.addEventListener('click', builtNode.attributes.onClick);
  }
  let appends: Node[] = await Promise.all(builtNode.children.map(async (child) => {
    if(isNull(child)) {
      return document.createTextNode('');
    }
    if(isNumber(child)) {
      child = child.toString();
    }
    if(isString(child)) {
      return document.createTextNode(child as string);
    } else {
      return await create(child as IVNode);
    }

  }));
  appends.forEach((child) => {
    element.appendChild(child);
  })
  return element;
}