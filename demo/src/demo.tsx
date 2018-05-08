import * as React from 'react';
import * as _ from 'lodash';
import autobind from 'react-autobind';
import Form from '../../src';
let formRef: any = undefined;
export default class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    autobind(this);
    this.state = {
      values: {
        address: [{ landmark: 'santosh sir', line4: 'acv' }],
        firstName: 'j',
        caption: 'Hala'
      }
    };
  }
  increaseNest() {
    this.state.values.address.push({ landmark: 'san@g.c', line4: 'acv@g.c' });
    formRef.injectValues(this.state.values);
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
          onChange={(values: {}) => {
            this.setState({ values: { ...values } });
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
                    validation: ['alphaNumeric', { min: 2 }]
                  })}
                />
                <h4>Naam:</h4>
                <input
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'caption',
                    validation: 'letters'
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

                        <input
                          {...$address.getHandlers({
                            type: 'input',
                            model: 'line4',
                            validation: 'email'
                          })}
                        />
                      </div>
                    );
                  })}
                </div>
                <button onClick={e => this.increaseNest()}>INCREASE</button>
                <button onClick={e => this.decreaseNest()}>DECREASE</button>
                <h3>Values</h3>
                <pre>{JSON.stringify($form.values, null, 4)}</pre>
                <h3>FieldStatus:</h3>
                <pre>{JSON.stringify($form.fieldStatus, null, 4)}</pre>
                <h3>formStatus:</h3>
                <pre>{JSON.stringify($form.formStatus, null, 4)}</pre>
              </div>
            );
          }}
        </Form>
        <button
          onClick={e =>
            this.setState({
              values: { ...this.state.values, firstName: '' }
            })
          }
        >
          TOGGLE VALUES
        </button>
      </div>
    );
  }
}
