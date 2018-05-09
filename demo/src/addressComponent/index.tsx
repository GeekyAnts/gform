import * as React from 'react';
import './styles.css';

interface myProps {
  $address: any;
  $form: any;
  close(index: number): void;
  addNewAdress(): void;
}

export default class Address extends React.Component<myProps, any> {
  constructor(props: myProps) {
    super(props);
  }
  render() {
    return (
      <div
        className="form-item-expandable-container-2"
        key={this.props.$address.index}
      >
        <div className="header">Address {this.props.$address.index}</div>
        {this.props.$address.index >= 1 && (
          <div className="close-button-container">
            <button
              className="close-button"
              onClick={() => this.props.close(this.props.$address.index)}
            >
              X
            </button>
          </div>
        )}
        {this.props.$address.index === 0 && (
          <button
            id="add-new-address-button"
            onClick={() => this.props.addNewAdress()}
          >
            +
          </button>
        )}
        <div className="form-item-row-1">
          <div className="form-item-row-2-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .homeaddress.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                )
              }
            >
              Address
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .homeaddress.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'homeaddress',
                validation: 'required',
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .homeaddress.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .homeaddress.errors.errorMessages.required
              ) : null}
            </div>
          </div>

          <div className="form-item-row-1-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .address2 &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .address2.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                )
              }
            >
              Address 2
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .address2 ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].address2.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                ) : (
                  'form-item-input'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'address2',
                validation: ['required'],
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              this.props.$form.fieldStatus.address[this.props.$address.index]
                .address2 &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .address2.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .address2.errors.errorMessages.required
              ) : null}
            </div>
          </div>

          <div className="form-item-row-1-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .zipCode ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].zipCode.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                ) : (
                  'form-item-title'
                )
              }
            >
              Zip Code
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .zipCode ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].zipCode.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                ) : (
                  'form-item-input'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'zipCode',
                validation: [{customRegx: /^[0-9]{6}$/}],
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              this.props.$form.fieldStatus.address[this.props.$address.index]
                .zipCode &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .zipCode.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .zipCode.errors.errorMessages.customRegx
              ) : null}
            </div>
          </div>
        </div>
        <div className="form-item-row-2">
          <div className="form-item-row-1-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .city ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].city.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                ) : (
                  'form-item-title'
                )
              }
            >
              City
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .city ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].city.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                ) : (
                  'form-item-input'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'city',
                validation: ['required', 'alphaNumeric'],
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              this.props.$form.fieldStatus.address[this.props.$address.index]
                .city &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .city.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .city.errors.errorMessages.required
              ) : null}
            </div>
          </div>

          <div className="form-item-row-1-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .state ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].state.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                ) : (
                  'form-item-title'
                )
              }
            >
              State / Province / Region
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .state ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].state.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                ) : (
                  'form-item-input'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'state',
                validation: ['required', 'alphaNumeric'],
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              this.props.$form.fieldStatus.address[this.props.$address.index]
                .state &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .state.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .state.errors.errorMessages.required
              ) : null}
            </div>
          </div>

          <div className="form-item-row-1-item">
            <div
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .country ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].country.errors.valid ? (
                  'form-item-title-validated'
                ) : (
                  'form-item-title-error'
                ) : (
                  'form-item-title'
                )
              }
            >
              Country
            </div>
            <input
              className={
                this.props.$form.fieldStatus.address &&
                this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ] &&
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .country ? this.props.$form.fieldStatus.address[
                  this.props.$address.index
                ].country.errors.valid ? (
                  'form-item-input-validated-2'
                ) : (
                  'form-item-input-error-2'
                ) : (
                  'form-item-input'
                )
              }
              {...this.props.$address.getHandlers({
                type: 'input',
                model: 'country',
                validation: ['required', 'alphaNumeric'],
              })}
            />

            <div className="error">
              {this.props.$form.fieldStatus.address &&
              this.props.$form.fieldStatus.address[this.props.$address.index] &&
              this.props.$form.fieldStatus.address[this.props.$address.index]
                .country &&
              !this.props.$form.fieldStatus.address[this.props.$address.index]
                .country.errors.valid ? (
                this.props.$form.fieldStatus.address[this.props.$address.index]
                  .country.errors.errorMessages.required
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
