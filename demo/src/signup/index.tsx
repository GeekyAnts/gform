import * as React from 'react';
import Form from '../../../src';
import AddressComponent from '../addressComponent/index';
import './styles.css';

let formRef: any = undefined;

export default class Signup extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      values: {
        //this is mandatory for form to link values
        name: '',
        email: '',
        passowrd: '',
        address: [
          {
            homeaddress: '',
            address2: '',
            zipCode: '',
            city: '',
            state: '',
            country: '',
          },
        ],
      },
    };
  }

  addNewAdress() {
    var address = [...this.state.values.address];
    address.push({
      homeaddress: '',
      address2: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
    });
    this.setState({values: {...this.state.values, address: [...address]}});

    formRef.injectValues({...this.state.values, address: [...address]});
  }
  close(key: number) {
    var address = [...this.state.values.address];
    address = address.filter((item: any, index: number) => index !== key);
    this.setState({values: {...this.state.values, address: [...address]}});
    formRef.injectValues({
      name: this.state.values.name,
      email: this.state.values.email,
      address: [...address],
      passowrd: this.state.values.passowrd,
    });
  }
  submit() {
    alert('submitted');
  }
  validatePasswordForWeakPassword(value: any) {
    var result = false;
    if (value) {
      if (value.length < 6) {
        result = false;
      } else {
        result = true;
      }
    } else {
      result = false;
    }
    return result;
  }

  clear() {
    this.setState({
      values: {
        //this is mandatory for form to link values
        name: '',
        email: '',
        address: [
          {
            homeaddress: '',
            address2: '',
            zipCode: '',
            city: '',
            state: '',
            country: '',
          },
        ],
      },
    });
    formRef.injectValues({
      //this is mandatory for form to link values
      name: '',
      email: '',
      address: [
        {
          homeaddress: '',
          address2: '',
          zipCode: '',
          city: '',
          state: '',
          country: '',
        },
      ],
    });
  }
  render() {
    return (
      <div id="form">
        <div className="title">G-form</div>
        <Form
          values={this.state.values}
          onChange={(values: {}, model: string) => {
            this.setState({values: {...values}});
          }}
          getFormRef={(ref: any) => (formRef = ref)}
        >
          {($form: any) => {
            return (
              <div id="form-container">
                <div className="form-item">
                  <div
                    className={
                      $form.fieldStatus.name ? $form.fieldStatus.name.errors
                        .valid ? (
                        'form-item-title-validated'
                      ) : (
                        'form-item-title-error'
                      ) : (
                        'form-item-title'
                      )
                    }
                  >
                    Name
                  </div>
                  <input
                    className={
                      $form.fieldStatus.name ? $form.fieldStatus.name.errors
                        .valid ? (
                        'form-item-input-validated'
                      ) : (
                        'form-item-input-error'
                      ) : (
                        'form-item-input'
                      )
                    }
                    {...$form.getHandlers({
                      type: 'input',
                      model: 'name',
                      validation: [{min: 2}],
                    })}
                  />

                  <div className="error">
                    {$form.fieldStatus.name &&
                    $form.fieldStatus.name.errors.valid ? null : (
                      $form.fieldStatus.name &&
                      $form.fieldStatus.name.errors.errorMessages.min
                    )}
                  </div>
                </div>

                <div className="form-item">
                  <div
                    className={
                      $form.fieldStatus.email ? $form.fieldStatus.email.errors
                        .valid ? (
                        'form-item-title-validated'
                      ) : (
                        'form-item-title-error'
                      ) : (
                        'form-item-title'
                      )
                    }
                  >
                    Email
                  </div>
                  <input
                    className={
                      $form.fieldStatus.email ? $form.fieldStatus.email.errors
                        .valid ? (
                        'form-item-input-validated'
                      ) : (
                        'form-item-input-error'
                      ) : (
                        'form-item-input'
                      )
                    }
                    {...$form.getHandlers({
                      type: 'input',
                      model: 'email',
                      validation: 'email',
                    })}
                  />

                  <div className="error">
                    {$form.fieldStatus.email &&
                    $form.fieldStatus.email.errors.valid ? null : (
                      $form.fieldStatus.email &&
                      $form.fieldStatus.email.errors.errorMessages.email
                    )}
                  </div>
                </div>

                <div className="form-item">
                  <div
                    className={
                      $form.fieldStatus.password ? $form.fieldStatus.password
                        .errors.valid ? (
                        'form-item-title-validated'
                      ) : (
                        'form-item-title-error'
                      ) : (
                        'form-item-title'
                      )
                    }
                  >
                    Password
                  </div>
                  <input
                    className={
                      $form.fieldStatus.password ? $form.fieldStatus.password
                        .errors.valid ? (
                        'form-item-input-validated'
                      ) : (
                        'form-item-input-error'
                      ) : (
                        'form-item-input'
                      )
                    }
                    {...$form.getHandlers({
                      type: 'input',
                      model: 'password',
                      validation: this.validatePasswordForWeakPassword,
                    })}
                  />

                  <div
                    className={
                      $form.fieldStatus.password &&
                      $form.fieldStatus.password.errors.valid ? (
                        'noError'
                      ) : (
                        'error'
                      )
                    }
                  >
                    {$form.fieldStatus.password &&
                    $form.fieldStatus.password.errors.valid ? (
                      'Strong password'
                    ) : (
                      'Weak password'
                    )}
                  </div>
                </div>
                <h2 className="title-2">Addresses</h2>
                <div id="form-item-expandable">
                  {$form.map('address', ($address: any) => {
                    return (
                      <div
                        className="form-item-expandable-container"
                        key={$address.index}
                      >
                        <AddressComponent
                          $address={$address}
                          $form={$form}
                          close={this.close.bind(this)}
                          addNewAdress={this.addNewAdress.bind(this)}
                        />
                      </div>
                    );
                  })}

                  <div id="button-container">
                    <button
                      onClick={() => this.submit()}
                      className="button-submit"
                    >
                      SUBMIT
                    </button>
                    <button onClick={() => this.clear()} className="button">
                      RESET
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        </Form>
      </div>
    );
  }
}
