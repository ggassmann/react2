import isString from '@f/is-string'

import { IVNode } from "./lib/IVNode";
import { isNumber, isFunction, isNull, isArray } from 'util';
import { resolveDispatcher, HookDispatcher, setDispatcher, cleanupDispatcher } from './hookDispatcher';
import { Fiber } from './lib/Fiber';

export const update = async (domElement: HTMLElement, node: IVNode, fiber: Fiber[]) => {
  console.log('got update with new fiber', fiber);
  node.currentFiber = fiber;
  setDispatcher(new HookDispatcher());
  let newNode = await create(node);
  cleanupDispatcher();
  domElement.replaceWith(newNode);
}

const createChild = async (child: string | IVNode) => {
  if (isNull(child)) {
    return document.createTextNode('');
  }
  if (isNumber(child)) {
    child = child.toString();
  }
  if (isString(child)) {
    return document.createTextNode(child as string);
  } else {
    return await create(child as IVNode);
  }
}

export const create = async (node: IVNode): Promise<HTMLElement | Text> => {
  console.log('Creating node', node);
  let tagName = node.tagName;
  let stringifiedTagName: string = '';
  let builtNode = node;
  let element: HTMLElement;
  if (!isString(tagName)) {
    if (!isNumber(tagName)) {
      if (isFunction(tagName)) {
        let dispatcher = resolveDispatcher()

        dispatcher.startHooks((fiber: Fiber[]) => update(element, node, fiber), node.currentFiber);
        builtNode = tagName({ children: node.children, ...node.attributes });
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
  let domKeys = Object.keys(builtNode.attributes).filter((key) => {
    let val = builtNode.attributes[key];
    if (key === 'onClick') {
      element.addEventListener('click', val);
      return false;
    }
    return true;
  });
  domKeys.forEach((key) => {
    let val = builtNode.attributes[key];
    element.setAttribute(key, val);
  })
  let appends: Node[] = await Promise.all(builtNode.children.map(async (child) => {
    return createChild(child);
  }));
  appends.forEach((child) => {
    element.appendChild(child);
  })
  return element;
}