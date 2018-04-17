import * as React from 'react';
import { render } from 'react-dom';

import Form from '../../src';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <h1>g-schema</h1>
        <Form
          initialValues={{
            firstName: { value: 'Jasbir' },
            address: [{ line1: { value: '78' } }]
          }}
        >
          {($form: any) => (
            <div>
              <h4>First: (Multi validation rules)</h4>
              <input
                {...$form.getHandlers({
                  type: 'input',
                  model: 'firstName',
                  validation: ['email']
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
                      <h4>line4</h4>
                      <input
                        {...$address.getHandlers({
                          type: 'input',
                          model: 'landmark',
                          validation: 'letters'
                        })}
                      />
                      <h4>landmark</h4>

                      <input
                        {...$address.getHandlers({
                          type: 'input',
                          model: 'line4',
                          validation: 'letters'
                        })}
                      />
                      <h4>line5</h4>
                      <input
                        {...$address.getHandlers({
                          type: 'input',
                          model: 'line5',
                          validation: 'letters'
                        })}
                      />
                    </div>
                  );
                })}
              </div>
              <h3>Values</h3>
              <pre>{JSON.stringify($form.values, null, 4)}</pre>
              <h3>FieldStatus:</h3>
              <pre>{JSON.stringify($form.fieldStatus, null, 4)}</pre>
              <h3>formStatus:</h3>
              <pre>{JSON.stringify($form.formStatus, null, 4)}</pre>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
