import * as React from 'react';
import {render} from 'react-dom';
import TestForm from './form';

class FormDemo extends React.Component<any, any> {
  render() {
    return <TestForm />;
  }
}

render(<FormDemo />, document.querySelector('#demo'));
