import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate (value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret)
    return token
  }
}
