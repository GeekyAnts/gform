import * as React from 'react';
<<<<<<< HEAD
import { render } from 'react-dom';
import * as _ from 'lodash';
import autobind from 'react-autobind';
import Form from '../../src';
let formRef: any = undefined;
class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    autobind(this);
    this.state = {
      values: {
        address: [{ landmark: 'santosh sir', line4: 'acv' }],
        firstName: 'j1',
        caption: 'Hala'
      }
    };
  }
  increaseNest() {
    // this.state.values.address.push({ landmark: 'san@g.c', line4: 'acv@g.c' });
    // formRef.injectValues(this.state.values);
    formRef.injectValues({
      address: [{ landmark: 'santosh sir', line4: 'acv' }],
      firstName: 'j@g.c',
      caption: 'Hala'
    });
  }
  decreaseNest() {
    this.state.values.address.pop();
    formRef.injectValues(this.state.values);
  }
  render() {
    return (
      <div>
        <h1>g-schema</h1>
        <Form
          values={this.state.values}
          onChange={(change: any) => {
            console.log('OnChange at ' + change.model);
            this.setState({ values: { ...change.newValues } });
          }}
          getFormRef={(ref: any) => (formRef = ref)}
        >
          {($form: any) => {
            return (
              <div>
                <h4>First: (Multi validation rules)</h4>
                <input
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'firstName',
                    validation: ['alphaNumeric', { min: 2 }, 'email']
                  })}
                />
                <h4>Naam:</h4>
                <input
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'caption',
                    validation: { customRegx: /^[0-9]+$/ }
                  })}
                />
                <h3>Addresses (Nesting)</h3>
                <div style={{ background: 'green', padding: 30 }}>
                  {$form.map('address', ($address: any) => {
                    return (
                      <div key={$address.index}>
                        <h1>Nest: {$address.index}</h1>
                        <h4>landmark</h4>
                        <input
                          {...$address.getHandlers({
                            type: 'input',
                            model: 'landmark',
                            validation: 'email'
                          })}
                        />
                        <h4>line4</h4>
=======
import {render} from 'react-dom';
import TestForm from './form';
>>>>>>> 90b4f0958edb351937982b71b5e567b3da54256c

class FormDemo extends React.Component<any, any> {
  render() {
    return <TestForm />;
  }
}

render(<FormDemo />, document.querySelector('#demo'));
