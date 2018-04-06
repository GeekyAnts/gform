import * as React from "react";
import { render } from "react-dom";

import Form from "../../src";

class Demo extends React.Component {
  render() {
    return (
      <Form>
        {($form: any) => (
          <div>
            <input
              {...$form.getHandlers({
                type: "input",
                model: "firstName",
                validation: ["number"]
              })}
            />

            <input
              {...$form.getHandlers({
                type: "input",
                model: "caption",
                validation: ["number"]
              })}
            />

            <pre>{JSON.stringify($form.values, null, 4)}</pre>
          </div>
        )}
      </Form>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
