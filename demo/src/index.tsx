import * as React from 'react';
import { render } from 'react-dom';
import * as _ from 'lodash';

import Form from '../../src';
class Demo extends React.Component {
  componentDidMount() {
    let error = {};
    let model = 'address[0].line1';
    _.set(error, model, { value: 'acid' });
    console.log(error);
  }
  render() {
    return (
      <Form
        initialValue={{ eml: 'ja', first: 'jas' }}
        onChange={(val: any) => console.log(val, 'onChange Callback')}
      >
        {($form: any) => (
          <div>
            <h2>Email:</h2>
            <input
              {...$form.getHandlers({
                type: 'input',
                model: 'email',
                validation: ['email', 'letters']
              })}
            />
            {$form.touched['email'] &&
              !$form.errors['email'].valid && (
                <p>{$form.errors['email'].errorMessage}</p>
              )}
            <h2>First:</h2>
            <input
              {...$form.getHandlers({
                type: 'input',
                model: 'first',
                validation: 'max8'
              })}
            />
            {$form.touched['first'] &&
              !$form.errors['first'].valid && (
                <p>{$form.errors['first'].errorMessage}</p>
              )}
            <h2>Experience:</h2>
            <input
              {...$form.getHandlers({
                type: 'input',
                model: 'experience',
                validation: 'number'
              })}
            />
            {$form.touched['experience'] &&
              !$form.errors['experience'].valid && (
                <p>{$form.errors['experience'].errorMessage}</p>
              )}
            <h3>Nests</h3>
            {$form.addressNest.map((item: any, index: number) => {
              return (
                <input
                  key={index}
                  {...$form.getHandlers({
                    type: 'input',
                    model: `addressNest[${index}][${Object.keys(item)[0]}]`,
                    validation: 'number'
                  })}
                />
              );
            })}
            {JSON.stringify($form.addressNest[0])}
            <h3>Values:</h3>
            <pre>{JSON.stringify($form.values, null, 4)}</pre>
            <h3>Errors:</h3>
            <pre>{JSON.stringify($form.errors, null, 4)}</pre>
            <h3>Touched:</h3>
            <pre>{JSON.stringify($form.touched, null, 4)}</pre>
            <h3>Pristine:</h3>
            <pre>{JSON.stringify($form.pristine, null, 4)}</pre>
            <h3>Submitted:</h3>
            <pre>{JSON.stringify($form.submitted, null, 4)}</pre>
            <h3>FieldStatus:</h3>
            <pre>{JSON.stringify($form.fieldStatus, null, 4)}</pre>
          </div>
        )}
      </Form>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
