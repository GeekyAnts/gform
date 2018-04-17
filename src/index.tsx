import * as React from 'react';

import autobind from 'react-autobind';
import validator from './validator/validator';

export default class GForm extends React.Component<
  {
    children: (form: any) => {};
    initialValue?: {};
    onChange?: Function;
  },
  any
> {
  actions: any;
  ui: any;

  constructor(props: any) {
    super(props);
    autobind(this);
    this.state = {
      values: {},
      validation: {},
      errors: {},
      touched: {},
      pristine: {},
      submitted: false,
      fieldStatus: {}
    };
    this.actions = {
      set: this.set,
      validate: this.validate,
      setTouched: this.setTouched,
      setPristine: this.setPristine,
      setSubmitted: this.setSubmitted
    };
    this.ui = { txtInp: this.getTxtInp };
  }
  componentDidMount() {
    this.setState(() => {
      return { values: { ...this.state.values, ...this.props.initialValue } };
    });
  }
  setSubmitted(value: boolean) {
    this.setState({
      submitted: value
    });
  }
  setTouched(model: string, value: boolean) {
    this.setState(() => {
      return { touched: { ...this.state.touched, [model]: value } };
    });
  }
  setPristine(model: string, value: boolean) {
    this.setState(() => {
      return { pristine: { ...this.state.pristine, [model]: value } };
    });
  }
  getTxtInp() {
    return (
      <input
        {...this.getHandlers({
          type: 'input',
          model: 'email',
          validation: 'email'
        })}
      />
    );
  }
  validate(model: string, value: any, validation: any) {
    this.setState(() => {
      return { ...validator(model, value, validation, this.state.errors) };
    });
    this.setState(() => {
      return {
        fieldStatus: {
          ...validator(model, value, validation, this.state.errors)
        }
      };
    });
  }

  set(model: string, value: any, validation: any) {
    this.actions.validate(model, value, validation);
    this.actions.setPristine(model, false);
    this.props.onChange ? this.props.onChange(this.state.values) : undefined;
    this.setState(() => {
      return { values: { ...this.state.values, [model]: value } };
    });
  }

  getHandlers({ type, model, validation }: any) {
    setTimeout(() => {
      this.actions.validate(
        model,
        this.state.values[model] ? this.state.values[model] : '',
        validation
      );
      this.state.pristine[model] === undefined
        ? this.actions.setPristine(model, true)
        : undefined;
    }, 0);
    switch (type) {
      case 'input':
        return {
          value: this.state.values[model] ? this.state.values[model] : '',
          onChange: (e: any) =>
            this.actions.set(model, e.target.value, validation),
          onFocus: (e: any) => {
            this.actions.setTouched(model, true);
          }
        };
        break;
    }
    return {};
  }

  render() {
    return this.props.children({
      values: this.state.values,
      actions: this.actions,
      getHandlers: this.getHandlers,
      errors: this.state.errors,
      ui: this.ui,
      touched: this.state.touched,
      pristine: this.state.pristine,
      submitted: this.state.submitted,
      fieldStatus: this.state.fieldStatus,
      addressNest : [
        {line1 : ''},
        {line2: ''},
        {landmark: ''}
      ]
    });
  }
}
