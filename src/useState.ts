import { resolveDispatcher } from "./hookDispatcher";
import { Fiber } from "./lib/Fiber";

export interface IStateResults<TResult> {
  state: TResult;
  setState: (TResult) => void;
}

export function useState<TResult>(initialValue: TResult): IStateResults<TResult> {
  let dispatcher = resolveDispatcher();
  let localOriginFiber = dispatcher.currentOriginFiber;
  let localFiber = new Fiber();
  localFiber.state = initialValue;
  dispatcher.currentFiber.next = localFiber;
  dispatcher.currentFiber = localFiber;
  let update = dispatcher.update;
  return {
    state: localFiber.state,
    setState: (TResult) => {
      localOriginFiber.clone();
      update(localOriginFiber);
    }
  }
}