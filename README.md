# g-schema

Easy, Angular like, hastlefree forms for React. <br/>
The Library is controlled in nature with the user having to define the `field` and also set it `onChange`
Checkout Demo app in the `./demo/` directory.

## Use case

```
import Gform from "gform";

 ....

render(){
  return(
<Gform value = {this.state.values}
      onChange= {(val : any) => this.setState({
        values: val.newValues
      })}>
          {($form: any) => (
            <div>
              <h4>First: (Multi validation rules)</h4>
              <input
                {...$form.getHandlers({
                  type: 'input',
                  model: 'firstName',
                  validation: [{ customRegx: '^[0-9]+$' }, 'digits']
                })}
              />
              // Nested form
              <h3>Addresses (Nesting)</h3>
              <div style={{ background: 'green', padding: 30 }}>
                {$form.map('address', ($address: any) => {
                  return (
                    <div key={$address.index}>
                      <h4>landmark</h4>
                      <input
                        {...$address.getHandlers({
                          type: 'input',
                          model: 'landmark',
                          validation: 'letters'
                        })}
                      />
                    </div>
                  );
                })}
          )}
        </Gform>
  )}
```

## Later all form data is available within out component in the $form object

```
        {
    "firstName": {
        "errors": {
            "valid": false,
            "errorMessages": {
                "digits": "only numbers",
                "customRegx": "No match"
            }
        },
        "touched": false,
        "untouched": true,
        "pristine": true,
        "dirty": false
    },
    "address": [
        {
            "landmark": {
                "errors": {
                    "valid": true,
                    "errorMessages": {}
                },
                "touched": false,
                "untouched": true,
                "pristine": true,
                "dirty": false
            }
        }
    ]
}
```

## Props :-

| Prop       |             Use             |   Type   |
| :--------- | :-------------------------: | :------: |
| Values     |  Value of controlled input  |  Object  |
| onChange   | Callback when values change | Function |
| getFormRef | Callback to get ref of form | Function |

## Setting values at runtime

In order to inject new values at runtime, all the fields need to be revalidated. <br />
For this very purpose, we have injectValues function in received formRef in `getFormRef` props. <br />

```
<Form
          values={this.state.values}
          onChange={(values: {}) => {
            this.setState({ values: { ...values.newValues } });
          }}
          getFormRef={(ref: any) => (formRef = ref)}
        >
```

Later values can be injected like this :-

```
this.state.values.address.push({ landmark: 'san@g.c', line4: 'acv@g.c' });
    formRef.injectValues(this.state.values);
```

## Validations :-

Validations can be one of following

1.  Predefined strings (`email`, `digits`, `alphaNumeric`, `alphaNumericNoSpaces`, `ip`, `password`, `urls`,`required`).
2.  Objects ({max : 10}, { min: 8 }, { validationRule: anyStringFromAbove }, { customRegx: 'customRegularExpression'})
3.  Custom Validation Method
4.  Array: Collection of any of the above validationRules.
