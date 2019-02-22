import { resolveDispatcher } from "./hookDispatcher";
import { Fiber } from "./lib/Fiber";

export interface IStateResults<TResult> {
  state: TResult;
  setState: (TResult) => void;
}

export function useState<TResult>(initialValue: TResult): IStateResults<TResult> {
  let dispatcher = resolveDispatcher();
  let localFiber = new Fiber();
  dispatcher.fibers.push(localFiber);
  localFiber.state = initialValue;
  let previousFiber = dispatcher.previousFibers[dispatcher.fibers.length - 1];
  if (previousFiber && previousFiber.state) {
    localFiber.state = previousFiber.state;
  }
  let update = dispatcher.update;
  return {
    state: localFiber.state,
    setState: (value: TResult) => {
      let newFibers = dispatcher.fibers.map((x) => {
        console.log(x);
        let f = new Fiber();
        if (x === localFiber) {
          f.state = value;
        } else {
          f.state = x.state;
        }
        return f;
      })
      update(newFibers);
    }
  }
}