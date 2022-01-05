import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParamError('field')
    }
  }
  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  const validationStub = makeFakeValidation()
  return new ValidationComposite([validationStub])
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ filed: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
