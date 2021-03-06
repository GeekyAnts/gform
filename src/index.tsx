import * as React from 'react';
import validator from './validator/validator';
import autobind from 'react-autobind';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, pairwise } from 'rxjs/operators';
import * as _ from 'lodash';
import ObjectDiffer from './objectDiffer';

let valuePropStream = new Subject();

export default class GForm extends React.Component<
  {
    children: (form: any) => {};
    initialValues?: any;
    onChange: Function;
    values?: any;
  },
  any
> {
  actions: {
    set: Function;
    validate: Function;
    setTouched: Function;
    setPristine: Function;
  };

  constructor(props: any) {
    super(props);
    autobind(this);
    this.state = {
      fieldStatus: {},
      formStatus: {
        pristine: true,
        dirty: false,
        valid: false,
        invalid: true,
        submitted: false
      }
    };
    this.actions = {
      set: this.set,
      validate: this.validate,
      setTouched: this.setTouched,
      setPristine: this.setPristine
    };
  }
  componentDidMount() {
    valuePropStream
      .pipe(
        map(val => {
          return val;
        }),
        pairwise(),
        map(([a, b]) => {
          return ObjectDiffer(a, b);
        })
      )
      .subscribe(val =>
        console.log(val, 'Change in props // Difference object')
      );
    valuePropStream.next({});
    valuePropStream.next(this.props.values);
  }

  componentWillReceiveProps(next: any) {
    console.log(next, 'jk');
    let vals = _.merge({}, _.clone(next.values)); // Immutable
    // this.propStream(vals);
    valuePropStream.next(vals);
  }

  map(model1: string, renderFormNest: Function) {
    if (!this.props.values[model1]) {
      setTimeout(
        () =>
          this.props.onChange({
            ...this.props.values,
            [model1]: [{}]
          }),
        0
      );
    } else {
      return this.props.values[model1].map((item: any, index: number) => {
        return renderFormNest({
          index: index,
          each: item,
          getHandlers: ({ type, model, validation }: any) => {
            return {
              ...this.getHandlers({
                type,
                model: model1 + '[' + index + ']' + '[' + model + ']',
                validation
              })
            };
          }
        });
      });
    }
  }

  validate(model: string, value: string, validation: any) {
    let fieldStatus = this.state.fieldStatus;
    let prevObj = _.get(this.state.fieldStatus, model)
      ? _.get(this.state.fieldStatus, model)
      : { errors: {} };
    delete prevObj.errors;
    _.set(fieldStatus, model, {
      errors: validator(value, validation),
      ...prevObj
    });
    this.setState(
      () => {
        return { fieldStatus: fieldStatus };
      },
      () => this.setFormValidity(this.state.fieldStatus)
    );
  }

  setFormPristine(value: boolean) {
    let formStatus = this.state.formStatus;
    formStatus.pristine = value;
    formStatus.dirty = !value;
    this.setState({ formStatus: formStatus });
  }

  setFormValidity(fieldStatus: any) {
    let invalidCount = 0;
    Object.keys(fieldStatus).map((item: any, index: any) => {
      if (fieldStatus[item].constructor === Array) {
        fieldStatus[item].map((item2: any, index: any) => {
          Object.keys(item2).map((item3, index3) => {
            if (!item2[item3].errors.valid) {
              invalidCount++;
            }
          });
        });
      } else if (!fieldStatus[item].errors.valid) {
        invalidCount++;
      }
    });
    invalidCount === 0
      ? this.setState({
          formStatus: {
            ...this.state.formStatus,
            valid: true,
            invalid: false
          }
        })
      : this.setState({
          formStatus: {
            ...this.state.formStatus,
            valid: false,
            invalid: true
          }
        });
  }

  set(model: string, value: any, validation: any, values: any) {
    let newValues = _.merge({}, _.clone(values)); // Immutable
    _.set(newValues, model, value);
    this.props.onChange(newValues);
    this.state.formStatus.pristine ? this.setFormPristine(false) : undefined;
    this.actions.validate(model, value, validation);
    _.get(this.state.fieldStatus, model).pristine
      ? this.actions.setPristine(model, false)
      : undefined;
  }

  setTouched(model: string, value: boolean) {
    let fieldStatus = this.state.fieldStatus;
    _.set(fieldStatus, model, {
      ..._.get(this.state.fieldStatus, model),
      touched: value,
      untouched: !value
    });
    this.setState(() => {
      return { fieldStatus: fieldStatus };
    });
  }
  setPristine(model: string, value: boolean) {
    let fieldStatus = this.state.fieldStatus;
    _.set(fieldStatus, model, {
      ..._.get(this.state.fieldStatus, model),
      pristine: value,
      dirty: !value
    });
    this.setState(() => {
      return { fieldStatus: fieldStatus };
    });
  }

  getHandlers({ type, model, validation }: any) {
    switch (type) {
      case 'input':
        setTimeout(() => {
          if (!_.get(this.state.fieldStatus, model)) {
            this.actions.validate(
              model,
              this.props.values[model] ? this.props.values[model] : '',
              validation
            );
            this.actions.setTouched(model, false);
            this.actions.setPristine(model, true);
          }
        }, 0);
        return {
          value: _.get(this.props.values, model)
            ? _.get(this.props.values, model)
            : '',
          onChange: (e: any) =>
            this.actions.set(
              model,
              e.target.value,
              validation,
              this.props.values
            ),
          onFocus: (e: any) => this.actions.setTouched(model, true)
        };
        break;
    }
    return {};
  }

  render() {
    return this.props.children({
      values: this.props.values,
      actions: this.actions,
      getHandlers: this.getHandlers,
      fieldStatus: this.state.fieldStatus,
      formStatus: this.state.formStatus,
      addressModel: this.state.addressModel,
      map: this.map
    });
  }
}
