import { CompareFieldValidation } from '.'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'wrong_field' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
