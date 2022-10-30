const jwt = require('jsonwebtoken')

const { BadRequest } = require('../errors')

const login  = async (req,res) =>{
    const {username, password} = req.body
    if(!username || !password){
        throw new BadRequest('Please provide email and password', 400)
    }

    const id = new Date().getDate()

    const token = jwt.sign({id, username, password},process.env.JWT_SECRET,{expiresIn:'30d'} )
    res.status(200).json({msg:'user created', token})
    //console.log(username, password);
    //res.send('Fake Login/Register/Signup Route')
}

const dashboard = async (req,res) =>{
    //console.log(req.user);
    
    const luckyNumber = Math.floor(Math.random() * 200)
        
    res.status(200).json({
        msg:`Hello, ${req.user.username } with password ${ req.user.password }`, 
        secret:`Here is your authorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login, dashboard,
}
