import { Fiber } from "./lib/Fiber";

let currentDispatcher;

export const setDispatcher = (dispatcher: HookDispatcher) => {
  currentDispatcher = dispatcher
}
export const cleanupDispatcher = () => {
  currentDispatcher = undefined;
}

export const resolveDispatcher = (): HookDispatcher => {
  if (currentDispatcher) {
    return currentDispatcher;
  } else {
    throw Error('Hooks cannot be called from outside the body of a function component. Dispatcher not in context');
  }
}

export class HookDispatcher {
  public previousFibers: Fiber[];
  public fibers: Fiber[];
  public update: (fibers: Fiber[]) => void;
  public startHooks(update: (fibers: Fiber[]) => void, previousFibers: Fiber[]) {
    this.fibers = [];
    this.previousFibers = previousFibers || [];
    this.update = update;
  }
  public finishHooks() {
    return this.fibers;
  }
}