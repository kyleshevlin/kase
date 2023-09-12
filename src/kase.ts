type Callback<Input, Return> = (input: Input) => Return

type Predicate<Input> = (input: Input) => boolean

type Pattern<Input> = Predicate<Input> | Input

function isPredicate<Input>(
  pattern: Pattern<Input>
): pattern is Predicate<Input> {
  return typeof pattern === 'function'
}

export function kase<Input>(input: Input) {
  return new Kase<Input, undefined>(input, false, undefined)
}

class Kase<Input, Result> {
  #input: Input
  #isMatched: boolean
  #result: Result

  constructor(input: Input, isMatched: boolean, result: Result) {
    this.#input = input
    this.#isMatched = isMatched
    this.#result = result
  }

  /**
   * Match a pattern to the input and return the callback's result
   * if there's a match
   */
  when<Return>(
    pattern: Pattern<Input>,
    callback: Callback<Input, Return>
  ): this | Kase<Input, Return> {
    if (this.#isMatched) return this

    const predicate = isPredicate<Input>(pattern)
      ? () => pattern(this.#input)
      : () => pattern === this.#input

    if (predicate()) {
      const result = callback(this.#input)

      return new Kase<Input, typeof result>(this.#input, true, result)
    }

    return this
  }

  /**
   * Provide a default case
   */
  otherwise<Return>(callback: Callback<Input, Return>) {
    if (this.#isMatched) return this.#result

    return callback(this.#input)
  }

  /**
   * Return the result if there is no default case
   */
  end() {
    return this.#result
  }
}
