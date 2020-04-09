import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes"

//strategy > ways of login
passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID:process.env.GH_ID,
    clientSecret:process.env.GH_SECRET,
    callbackURL:`http://localhost:4000${routes.githubCallback}`
},
    githubLoginCallback
));

passport.use(new FacebookStrategy({
    clientID:process.env.FB_ID,
    clientSecret:process.env.FB_SECRET,
    callbackURL : `https://d3b1c49f.ngrok.io${routes.facebookCallback}`,
    profileFields:['id','displayName','photos','email'],
    scope:['public_profile','email']

},
    facebookLoginCallback
));

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

passport.serializeUser( (user, done) => {
    done(null, user)
});

passport.deserializeUser( (user, done) => {
    done(null, user)
});












// github
// github website(auth)
// github website (auth) -> /auth/github/callback
// passport 는 githubLoginCallback (ex.profile) 콜백함수 실행 
// > githubLoginCallback함수는 무조건 cb를 리턴해 줘야한다.  
// return cb(error) or cb(null, user) 

// cookie를 저장
// cookie = makeCookie(user)
// savedCookie = saveCookie(cookie)
// sendCookie(savedCookie) > cookie를 브라우저로 보냄