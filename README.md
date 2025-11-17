# @kyleshevlin/kase

A simple, type-safe pattern-ish matching function.

```javascript
const result = kase(person.age)
  .when(1, "You're just a baby!")
  .when(x => x < 18, "You've gotten so big!")
  .when(x => x < 65, "So how's work?")
  .when(
    x => x < 90,
    age => `Holy smokes, You don't look a day over ${age - 10}!`
  )
  .otherwise(() => 'Uhh, do you even have a pulse?')
```

## Installation

```
npm install @kyleshevlin/kase
```

## API

**Note**: It might be to your benefit to take a look at the types in `kase.ts`.

### `kase`

```typescript
function kase(input) {}
```

`kase` takes an `input` which is any value, and stores it to be compared to the `pattern`s passed to the `when` and `otherwise` methods.

### `when`

```typescript
function when(pattern, resolution) {}
```

`when` receives a `pattern` to compare to the `input`. A `pattern` can either be a value of the same type as `input`, or a predicate function that receives the `input` as an argument. If the `pattern` argument is a value, it is matched strictly against the `input` with `===`.

`when` also receives a `resolution`. This can be a value or a function that receives the argument passed to `kase` and returns the desired result. The first `when` to match is the result of the `kase` chain.

### `otherwise`

```typescript
function otherwise(resolution) {}
```

`otherwise` is how we provide a default result. It receives a `resolution` exactly like `when`. `otherwise` will return the result of the `resolution` as the result of the entire chain.

### `end`

```typescript
function end() {}
```

If no `otherwise` is provided, `end` is necessary to complete the chain and return the result. Like so:

```javascript
const result = kase(Math.random())
  .when(x => x <= 0.33, 'low')
  .when(x => x <= 0.67, 'mid')
  .when(x => x <= 0.99, 'high')
  .end() // would return `undefined` in the cases where x is > .99
```
