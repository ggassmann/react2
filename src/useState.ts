import { resolveDispatcher } from "./hookDispatcher";

export interface IStateResults<TResult> {
  state: TResult;
  setState: (TResult) => void;
}

export function useState<TResult>(initialValue: TResult): IStateResults<TResult> {
  let dispatcher = resolveDispatcher();
  let localFiber = {
    state: initialValue,
  }
  dispatcher.currentFiber.next = localFiber;
  dispatcher.currentFiber = localFiber;
  let update = dispatcher.update;
  return {
    state: localFiber.state,
    setState: (TResult) => {
      localFiber.state = TResult;
      update();
    }
  }
}