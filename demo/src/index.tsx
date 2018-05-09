import * as React from 'react';
import {render} from 'react-dom';
//import TestForm from './form';
import Signup from './signup/index';

class FormDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Signup />
      </div>
    );
  }
}

render(<FormDemo />, document.querySelector('#demo'));
