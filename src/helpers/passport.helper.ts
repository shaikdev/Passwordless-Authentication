import _ from "lodash";
import UserService from "../services/user.service";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserService.userDetails(jwt_payload.data.id);
        if (!_.isEmpty(user)) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err: any) {
        console.log("passport middleware error", err);
      }
    })
  );
};
