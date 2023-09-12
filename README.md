# @kyleshevlin/kase

A simple pattern matching function.

```javascript
const result = kase(person.age)
  .when(1, () => "You're just a baby!")
  .when(
    x => x < 18,
    () => "You've gotten so big!"
  )
  .when(
    x => x < 65,
    () => "So how's work?"
  )
  .when(
    x => x < 90,
    age => `Holy smokes, You don't look a day over ${age - 10}!`
  )
  .otherwise(() => 'Uhh, do you even have a pulse?')
```

## API

### `kase`

`kase` takes a `left` which is any value, and stores it to be compared to the `right`s passed in the `when` methods.

### `when`

`when` receives a `right` to compare to the `left`. `right` can either be a predicate function that receives the `left` as an argument, or a value to strictly compare to the `left`.

The first `when` to return a `true` match is the result of the `kase` chain.

Each `when` must also supply a callback function that receives the `left` as an argument. The returned value of the callback is the result returned at the end of the chain.

### `otherwise`

A method for providing a default result. Recieves a callback function that recieves the `left` as an argument.

### `end`

If no `otherwise` is provided, `end` is used to complete the chain and return the result

###
