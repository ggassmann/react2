import { IFiber } from "./lib/IFiber";

let currentDispatcher;

export const setDispatcher = (dispatcher: HookDispatcher) => {
  currentDispatcher = dispatcher
}
export const cleanupDispatcher = () => {
  currentDispatcher = undefined;
}

export const resolveDispatcher = (): HookDispatcher => {
  if(currentDispatcher) {
    return currentDispatcher;
  } else {
    throw Error('Hooks cannot be called from outside the body of a function component. Dispatcher not in context');
  }
}

export class HookDispatcher {
  public currentOriginFiber: IFiber;
  public currentFiber: IFiber;
  public update: () => void;
  public startHooks(update: () => void, previousFiber: IFiber) {
    console.log('started hooks with', previousFiber);
    this.update = update;
    this.currentFiber = previousFiber || {state: 'origin', next: null};
    this.currentOriginFiber = this.currentFiber;
  }
  public finishHooks() {
    return this.currentOriginFiber;
  }
}