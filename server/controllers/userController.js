const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const createJWT = (id, email, role) => {
  return jwt.sign(
    {id, email, role}, 
    process.env.SECRET_JWT_KEY, 
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, password, role} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'))
    }
    const hashedPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashedPassword, role})
    const basket = await Basket.create({userId: user.id})
    const token = createJWT(user.id, user.email, user.role)
    return res.json({token})
  }

  
  async login(req, res) {
    const {email, password, role} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не зарегистрирован'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Не верный пароль'))
    }
    const token = createJWT(user.id, user.email, user.role)
    return res.json({token})
  }


  async auth(req, res, next) {
    const token = createJWT(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController() 