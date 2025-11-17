type Callback<Input, Return> = (input: Input) => Return

type Resolution<Input, Return> = Callback<Input, Return> | Return

type Predicate<Input> = (input: Input) => boolean

type Pattern<Input> = Predicate<Input> | Input

function isCallback<Input, Return>(
  result: Resolution<Input, Return>
): result is Callback<Input, Return> {
  return typeof result === 'function'
}

function isPredicate<Input>(
  pattern: Pattern<Input>
): pattern is Predicate<Input> {
  return typeof pattern === 'function'
}

export function kase<Input>(input: Input) {
  return new Kase<Input, undefined>({
    input,
    isMatched: false,
    result: undefined,
  })
}

type KaseOptions<Input, Result> = {
  input: Input
  isMatched: boolean
  result: Result
}

class Kase<Input, Result> {
  #input: Input
  #isMatched: boolean
  #result: Result

  constructor({ input, isMatched, result }: KaseOptions<Input, Result>) {
    this.#input = input
    this.#isMatched = isMatched
    this.#result = result
  }

  #resolve<Return>(resolution: Resolution<Input, Return>): Return {
    return isCallback(resolution) ? resolution(this.#input) : resolution
  }

  /**
   * Match a pattern to the input and if there's a match,
   * return the resolution's result
   */
  when<Return>(
    pattern: Pattern<Input>,
    resolution: Resolution<Input, Return>
  ): this | Kase<Input, Return> {
    if (this.#isMatched) return this

    const isMatch = isPredicate<Input>(pattern)
      ? pattern(this.#input)
      : pattern === this.#input

    if (isMatch) {
      const result = this.#resolve(resolution)

      // Returning a new Kase is what enables type inference for the result
      return new Kase<Input, typeof result>({
        input: this.#input,
        isMatched: true,
        result,
      })
    }

    return this
  }

  /**
   * Provide a default case
   */
  otherwise<Return>(resolution: Resolution<Input, Return>) {
    if (this.#isMatched) return this.#result

    return this.#resolve(resolution)
  }

  /**
   * Return the result if there is no default case
   */
  end() {
    return this.#result
  }
}
