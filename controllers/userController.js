import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import {loggedUser} from "../middlewares";

export const getJoin = (req, res) => {
    res.render('Join', {pageTitle :'Join'});
}

export const postJoin = async (req, res, next) => {
    const {
        body:{name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        console.log("wrong");
        res.render('Join', {pageTitle :'Join'});
    }else{
        try{
            const user = await User({
                name, 
                email
            });
            //To Do : Register User
            await User.register(user, password);
            console.log(333);
            next();
            //To Do : Log user in
        }catch(error){
            console.log(error);
            res.redirect(routes.join);
        }
    }
}

export const getLogin = (req, res) => {
    res.render('Login',{pageTitle :'Login'});
}

export const postLogin = passport.authenticate("local",{
    failureRedirect : routes.login,
    successRedirect : routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async(_, __, profile, cb) =>{
    const { _json : { id, avatar_url : avatarUrl, name, email }} = profile;
    try{
        const user = await User.findOne({email});
        if(user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId:id,
            avatarUrl
        });
        return cb(null, newUser);
        
    }catch(error){
        return cb(error);
    }

}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async(_, __, profile, cb) =>{
    const {_json:{id, name, email}} = profile;
    try{
        const user = await User.findOne({email});
        if(user){
            user.facebookId = id;
            user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            facebookId:id,
            avatarUrl:`https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    
    }catch(error){
        return cb(error);
    }
}

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    //To Do : Process Log Out
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res) => {
    res.render('UserDetail',{pageTitle :'User Detail', user: req.user});
}

export const users = (req, res)=> 
    res.render('Users',{pageTitle :'Users'});

export const userDetail = async(req, res)=>{
    const {params : { id }} = req;
    try{
        const user = await User.findById(id);
        res.render("userDetail", {pageTitle : "User Detail", user});
    }catch(error){
        res.redirect(routes.home);
    }
}

export const getEditProfile = (req, res)=>{
    res.render('EditProfile',{pageTitle :'Edit Profile'});
}

export const postEditProfile = async(req, res) =>{
    const {
        body :{name, email},
        file
    } = req;
    try{
        await User.findByIdAndUpdate(req.user._id,{
            name, email, avatarUrl: file ? file.path: req.user.avatarUrl
        });
        req.user.name = name;
        req.user.email = email;
        req.user.avatarUrl =  file ? file.path: req.user.avatarUrl;
        res.redirect(routes.me);
    }catch(error){
        res.redirect(routes.editProfile);
    }
}

export const getChangePassword = (req, res)=>{
    res.render('changePassword',{pageTitle :'Change Password'});
}

export const postChangePassword = async(req, res) => {
    const {
        body : {
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try{
        if(newPassword !== newPassword1){
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    }catch(error){
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
}
    