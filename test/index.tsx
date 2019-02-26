import '@babel/polyfill';

import * as React2 from '../src';
import { useState } from '../src/useState';
import { styled } from '../src/styled/styled';

let render = React2.createApp(document.body);

let MyButton = styled('button')`
  color: red;
  background-color: blue;
`;

const Button = () => {
  const { state: clicks1, setState: setClicksState1 } = useState<number>(0);
  console.log(clicks1)
  return (
    <div>
      <MyButton onClick={() => {
        setClicksState1(clicks1 + 1)
        console.log('got click');
      }}>
        Child
      </MyButton>
      Clicks: {clicks1}
    </div>
  );
  /*
  return (
    <div>
      <MyButton onClick={() => setClicksState1(clicks1 + 1)}>
        +
      </MyButton>
      <button onClick={() => setClicksState1(clicks1 - 1)}>
        -
      </button>
      <br />
      Clicks: {clicks1}
    </div>
  )
  */
}

render(
  <div>
    <Button></Button>
  </div>
)