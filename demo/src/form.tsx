import * as React from 'react';
import Form from '../../src';
import './styles.css';

let formRef: any = undefined;

export default class TestForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      values: {
        //this is mandatory for form to link values
        name: '',
        mailId: '',
        country: '',
        phoneNumber: '',
        pincode: '',
        gitLink: '',
      },
      showError: false, //to display error on submit. By default error is displayed synchronously.
    };
  }

  validatePhoneNumber(value: any) {
    var validateResult = false;
    if (value) {
      if (value.length === 10) {
        validateResult = true;
      }
    } else {
      validateResult = false;
    }
    return validateResult;
  }

  setCountry(value: any) {
    this.setState({values: {...this.state.values, country: value}});
  }
  onSubmit() {
    this.setState({showError: true});
  }

  render() {
    return (
      <Form
        values={this.state.values}
        onChange={(values: {}) => {
          console.log(values);
          this.setState({values: {...values}});
        }}
        getFormRef={(ref: any) => (formRef = ref)}
      >
        {($form: any) => {
          return (
            <div id="form">
              <div id="form-part">
                <h4>Name: multi validation rules (alphaNumeric,min)</h4>
                <input
                  className="input"
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'name',
                    validation: ['alphaNumeric', {min: 2}],
                  })}
                />
                <div className="error">
                  {$form.fieldStatus.name &&
                  $form.fieldStatus.name.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  )}
                </div>
                <h4>mail Id: mail Id validator</h4>
                <input
                  className="input"
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'email',
                    validation: 'email',
                  })}
                />
                <div className="error">
                  {$form.fieldStatus.email &&
                  $form.fieldStatus.email.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  )}
                </div>
                <h4>
                  Phone number: Custom validator method with required(built in)
                  validator
                </h4>
                <input
                  className="input"
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'phoneNumber',
                    validation: ['required', this.validatePhoneNumber],
                  })}
                />
                <div className="error">
                  {$form.fieldStatus.phoneNumber &&
                  $form.fieldStatus.phoneNumber.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  )}
                </div>

                <h4>
                  Country: Change in form values When user enters on input box
                  or when values are changed on fly
                </h4>
                <div id="change-on-fly">
                  <input
                    className="input"
                    {...$form.getHandlers({
                      type: 'input',
                      model: 'country',
                      validation: ['required'],
                    })}
                  />
                  <span>
                    <select
                      onChange={(event: any) => {
                        this.setCountry(event.target.value);
                      }}
                    >
                      <option>Select</option>
                      <option>India</option>
                      <option>US</option>
                      <option>UK</option>
                    </select>
                  </span>
                </div>
                <div className="error">
                  {$form.fieldStatus.country &&
                  $form.fieldStatus.country.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  )}
                </div>
                <h4>
                  pincode: custom Regular expression with other built in
                  validator
                </h4>
                <input
                  className="input"
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'pincode',
                    validation: ['required', /^[0-9]{6}$/],
                  })}
                />
                <div className="error">
                  {$form.fieldStatus.phoneNumber &&
                  $form.fieldStatus.phoneNumber.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  )}
                </div>

                <h4>
                  gitLink: URL validator and Individual onChange method
                  execution. onSubmit display error.
                </h4>
                <input
                  className="input"
                  onChange={event =>
                    console.log(
                      'Individual onChange method: gitLink Changed ' +
                        event.target.value
                    )}
                  {...$form.getHandlers({
                    type: 'input',
                    model: 'gitLink',
                    validation: 'urls',
                  })}
                />
                <div className="error">
                  {this.state.showError ? $form.fieldStatus.gitLink &&
                  $form.fieldStatus.gitLink.errors.valid ? (
                    'valid'
                  ) : (
                    'invalid'
                  ) : null}
                </div>
                <div id="submit-parent">
                  <button id="submit" onClick={() => this.onSubmit()}>
                    Submit
                  </button>
                </div>
              </div>

              <div id="form-values">
                <span className="form-value-child">
                  <h3>Values</h3>
                  <pre>{JSON.stringify($form.values, null, 4)}</pre>
                </span>
                <span className="form-value-child">
                  <h3>FieldStatus:</h3>
                  <pre>{JSON.stringify($form.fieldStatus, null, 4)}</pre>
                </span>
                <span className="form-value-child">
                  <h3>formStatus:</h3>
                  <pre>{JSON.stringify($form.formStatus, null, 4)}</pre>
                </span>
              </div>
            </div>
          );
        }}
      </Form>
    );
  }
}
