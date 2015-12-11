/*eslint-env mocha */
/*eslint-disable no-console */
import expect from '../index'
import isEqual from 'is-equal'

describe('toInclude', function () {
  it('requires the actual value to be an array or string', function () {
    expect(function () {
      expect(1).toInclude(2)
    }).toThrow(/must be an array or a string/)
  })

  it('does not throw when an array contains an expected integer', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(2)
      expect([ { a: 1 }, { c: 2 } ]).toInclude({ c: 2 })
    }).toNotThrow()
  })

  it('does not throw when an array contains an expected object', function () {
    expect(function () {
      expect([ { a: 1 }, { c: 2 } ]).toInclude({ c: 2 })
    }).toNotThrow()
  })

  it('throws when an array does not contain an expected integer', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(4)
    }).toThrow(/to include/)
  })

  it.only('throws when an array does not contain an expected object', function () {
    expect(function () {
      console.log(isEqual({ a: 1 }, { a: 2 }))
      console.log(isEqual({ c: 2 }, { a: 2 }))
      console.log(
        [ { a: 1 }, { c: 2 } ].some(o => isEqual(o, { a: 2 }))
      )

      expect([ { a: 1 }, { c: 2 } ]).toInclude({ a: 2 })
    }).toThrow(/to include/)
  })

  it('does not throw when a string contains the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('world')
    }).toNotThrow()
  })

  it('throws when a string does not contain the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('goodbye')
    }).toThrow(/to include/)
  })
})
