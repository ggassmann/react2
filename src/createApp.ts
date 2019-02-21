import {create} from './dom';
import {HookDispatcher, setDispatcher, cleanupDispatcher} from './hookDispatcher';

export const createApp = (container: HTMLElement) => {
  let createAppFromRootNode = async (rootNode) => {
    setDispatcher(new HookDispatcher());
    const element = await create(rootNode);
    cleanupDispatcher();
    container.appendChild(element);
  }

  return async (vnode) => {
    await createAppFromRootNode(vnode);
  }
}
