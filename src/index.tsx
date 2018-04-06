import * as React from "react";

import autobind from "react-autobind";

export default class GForm extends React.Component<
  { children: (form: any) => {} },
  any
> {
  actions: any;
  constructor(props: any) {
    super(props);
    autobind(this);

    this.state = {
      values: {},
      validation: {},
      errors: {}
    };

    this.actions = {
      set: this.set
    };
  }

  set(field: string, value: any) {
    this.setState(() => {
      return {
        values: {
          ...this.state.values,
          [field]: value
        }
      };
    });
  }

  getHandlers({ type, model, valudation }: any) {
    switch (type) {
      case "input":
        return {
          value: this.state.values[model],
          onChange: (e: any) => this.actions.set(model, e.target.value)
        };

        break;
    }

    return {};
  }

  render() {
    return this.props.children({
      values: this.state.values,
      actions: this.actions,
      getHandlers: this.getHandlers
    });
  }
}
