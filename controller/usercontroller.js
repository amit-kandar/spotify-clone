require('dotenv').config()
const db = require('../config/database')
const { signupSchema, signinSchema } = require('../validator/userValidator')
const jwt = require('jsonwebtoken')

const jwtsec = process.env.JWT_Sec
const User = db.User

const SignUp = async (req, res) => {

    let success = false;

    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(422).json({ success: success, message: error.message });

    const info = {
        name: req.body.name,
        email: req.body.email
    };

    const email = await User.findOne({ where: { email: info.email } });
    if (email) return res.status(409).json({ success: success, message: "User already exits" });
    try {
        const user = await User.create(info);
        success = true;
        res.status(201).json({ success: success, user: user });
    } catch (error) {
        res.status(500).json("Server Crush");
    }
}

const SignIn = async(req,res)=>{
    let success = false;

    const { error } = signinSchema.validate(req.body);
    if(error) return res.status(422).json({success: success, message: error.message});

    try {
        const user = await User.findAll({ where: {email: req.body.email}});
        if(!user) return res.status(422).json({success: success, message: "Invalid Email"});

        const data = user[0].dataValues

        const payload = {
            id: data.id,
            name: data.name,
            email: data.email
        }

        const authtoken = jwt.sign(payload, jwtsec);

        success = true;

        res.status(200).json({success: success, authtoken: authtoken});


    } catch (error) {
        res.status(500).json({ success: success, message: error.message });
    }
}

const GetUser = async(req, res)=>{
    let success = false;
    try {
        const user = await User.findAll({where: {email: data.email}});

        success = true;

        res.status(200).json({success: success, User: user})
        
    } catch (error) {
        res.status(500).json({ success: success, message: error.message })
    }
}



module.exports = { SignUp, SignIn, GetUser }