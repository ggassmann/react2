import '@babel/polyfill';
import * as React2 from '../src';
import { useState } from '../src/useState';

let render = React2.createApp(document.body);

const Button = () => {
  const {state: clicks1, setState: setClicksState1} = useState<number>(0);
  const {state: clicks2, setState: setClicksState2} = useState<number>(1);
  return (
    <div>
      <button onClick={() => setClicksState1(clicks1 + 1)}>
        Clicks: {clicks1}
      </button>
      <button onClick={() => setClicksState2(clicks2 + 1)}>
        Clicks: {clicks2}
      </button>
    </div>
  )
}

render(
  <div>
    Test
    <div>
      <Button></Button>
    </div>
    Test3
  </div>
)