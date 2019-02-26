import isUndefined from '@f/is-undefined'
import isString from '@f/is-string'
import isNumber from '@f/is-number'
import isNull from '@f/is-null'
import { IVNode } from './lib/IVNode';

export function createElement(type, attributes, ...children) {
  if (!type) throw new TypeError('element() needs a type.')
  attributes = attributes || {}

  let key = isString(attributes.key) || isNumber(attributes.key)
    ? attributes.key
    : null

  delete attributes.key

  if (typeof type === 'object') {
    type = Object.assign(type, { attributes, children });
    return type;
  }

  if (typeof type === 'function') {
    //return createThunkElement(type, key, attributes, children, type)
  }

  return {
    type: 'native',
    tagName: type,
    attributes,
    children,
    key
  }
};