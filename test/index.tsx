import '@babel/polyfill';
import * as React2 from '../src';
import { useState } from '../src/useState';

let render = React2.createApp(document.body);

const Button = () => {
  const { state: clicks1, setState: setClicksState1 } = useState<number>(0);
  return (
    <div>
      <button onClick={() => setClicksState1(clicks1 + 1)}>
        +
      </button>
      <button onClick={() => setClicksState1(clicks1 - 1)}>
        -
      </button>
      <br />
      Clicks: {clicks1}
    </div>
  )
}

render(
  <div>
    <Button></Button>
  </div>
)