# g-schema

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Use case

```
<Form>
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
                {$form.map('books', ($address: any) => {
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
        </Form>
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

## Validations :-

Validations can be one of following

1.  Predefined strings ('email', 'digits', 'alphaNumeric', 'alphaNumericNoSpaces', 'ip', 'password', 'urls').
2.  Objects ({max : 10}, { min: 8 }, { validationRule: anyStringFromAbove }, { customRegx: 'customRegularExpression'})
3.  Array: Collection of any of the above validationRules.
