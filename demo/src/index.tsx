import * as React from 'react';
import { render } from 'react-dom';
import * as _ from 'lodash';
import autobind from 'react-autobind';
import Form from '../../src';
class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    autobind(this);
    this.state = {
      values: {
        address: [{ landmark: 'santosh sir', line4: 'fsa' }],
        firstName: 'jazza'
      }
    };
  }
  increaseNest() {
    this.state.values.address.push({ landmark: '', line4: '' });
    this.forceUpdate();
    // this.setState({
    //   values: {
    //     ...this.state.values,
    //     address: [
    //       { landmark: 'santosh sir', line4: 'fsa' },
    //       { landmark: 'fasfaf sifasr', line4: 'hgf' }
    //     ]
    //   }
    // });
  }
  decreaseNest() {
    this.state.values.address.pop();
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <h1>g-schema</h1>
        <Form
          values={this.state.values}
          onChange={(values: {}) => {
            this.setState({ values: values });
          }}
        >
          {($form: any) => (
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
          )}
        </Form>
        <button
          onClick={e =>
            this.setState({
              values: { ...this.state.values, firstName: 'hehehe' }
            })
          }
        >
          TOGGLE VALUES
        </button>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
