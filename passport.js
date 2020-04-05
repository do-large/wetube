import passport from "passport";
import User from "./models/User";

//strategy > ways of login
passport.use(User.createStrategy());