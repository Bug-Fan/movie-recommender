import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";

export class JWTstrategy extends PassportStrategy(Strategy, 'MyStrategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_secreat,
    })
  }

  validate(payload: any) {
    return payload;
  }
  
}