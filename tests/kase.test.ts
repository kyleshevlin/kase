import { kase } from '../src/kase'

describe('kase', () => {
  it('should handle a value as a `resolution`', () => {
    const result = kase('a').when('a', 'first').end()

    expect(result).toEqual('first')
  })

  it('should return the first `when` that matches', () => {
    const result = kase('a').when('a', 'first').when('a', 'second').end()

    expect(result).toEqual('first')
  })

  it('should return `undefined` if all `when`s fail', () => {
    const result = kase('a')
      .when('b', () => 'b')
      .when('c', () => 'c')
      .end()

    expect(result).toEqual(undefined)
  })

  it('should return the existing match if `otherwise` is called', () => {
    const result = kase('a')
      .when('a', () => 'first')
      .when('b', () => 'second')
      .otherwise(() => 'third')

    expect(result).toEqual('first')
  })

  it('should return `otherwise` callback result if all `when`s fail', () => {
    const result = kase('a')
      .when('b', () => 'b')
      .when('c', () => 'c')
      .otherwise(() => 'd')

    expect(result).toEqual('d')
  })

  it('should take a predicate as a `pattern`, passing the `input`', () => {
    const result = kase({ a: 'a', b: 'b', c: 'c' })
      .when(
        obj => obj.a === 'aaa',
        () => 'first'
      )
      .when(
        obj => obj.b === 'b',
        () => 'second'
      )
      .end()

    expect(result).toEqual('second')
  })

  it('should pass the `input` to the `callback`', () => {
    const result = kase(42)
      .when(42, s => s * 2)
      .end()

    expect(result).toEqual(42 * 2)
  })
})
