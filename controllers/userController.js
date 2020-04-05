import routes from "../routes";

export const getJoin = (req, res) => {
    res.render('Join', {pageTitle :'Join'});
}

export const postJoin = (req, res) => {
    const {
        body:{name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        console.log("wrong");
        res.render('Join', {pageTitle :'Join'});
    }else{
        //To Do : Register User
        //To Do : Log user in
        res.redirect(routes.home)
    }
}

export const getLogin = (req, res) => {
    res.render('Login',{pageTitle :'Login'});
}

export const postLogin = (req, res) => {
    res.redirect(routes.home)
}

export const logout = (req, res) => {
    //To Do : Process Log Out
    res.redirect(routes.home);
    
}


export const users = (req, res)=> 
    res.render('Users',{pageTitle :'Users'});

export const userDetail = (req, res)=>
    res.render('UserDetail',{pageTitle :'User Detail'});

export const editProfile = (req, res)=>
    res.render('EditProfile',{pageTitle :'Edit Profile'});

export const changePassword = (req, res)=>
    res.render('ChangePassword',{pageTitle :'Change Password'});