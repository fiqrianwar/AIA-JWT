    const { User } = require('../../databases/models'),
        bcrypt = require('bcryptjs'),
        jwt = require('jsonwebtoken')

    const cryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(5)
        return bcrypt.hash(password.toString(), salt)
    }

    module.exports = {
        login: async (req,res,next) => {
            try {
                const user = await User.findOne({ where : {
                    email: req.body.email
                }})
                if(!user) {
                    return res.status(403).json({
                        errors: "we don`t have any information for your account"
                    })
                }

                if (bcrypt.compareSync(req.body.password.toString(), user.password)) {
                    const token = jwt.sign({ id: user.id },'secret_key',{ expiresIn: '6h' })
            
                    return res.status(200).json({
                        data: {
                            token
                        }
                    })
                }
            
                return res.status(409).json({
                    errors: "email or password is not match"
                })

            } catch (err) {
                next(err)
            }
        },
        register: async (req,res,next) => {
            try {

                const user = await User.findOne({ where : {
                    email: req.body.email
                }})

                if(user) {
                    return res.status(403).json({
                        errors: "email already used"
                    })
                }

                const store = await User.create({
                    ...req.body,
                    password: await cryptPassword(req.body.password)
                })

                return res.status(201).json({
                    data: store
                })
            } catch (err) {
                next(err)
            }
        },
        getProfile: async (req,res,next) => {
            try {

                const user = await User.findOne({ where : {
                    id: res.user.id
                }})

                return res.status(201).json({
                    data: user
                })
            } catch (err) {
                next(err)
            }
        },
        updateProfile: async (req,res,next) => {
            try {
                const { name, phone } = req.body
                await User.update({
                    name,
                    phone
                }, {
                    where: {
                    id: res.user.id
                    }
                });

                return res.status(204).json()

            } catch (err) {
                next(err)
            }
        },
        changePassword: async (req,res,next) => {
            try {
                const { password } = req.body
                await User.update({
                    password: await cryptPassword(password.toString())
                }, {
                    where: {
                    id: res.user.id
                    }
                });

                return res.status(204).json()
            } catch (err) {
                next(err)
            }
        },
        resetPassword: async (req,res,next) => {
            try {
                const { password } = req.body;

                const user = await User.findOne({ where : {
                    email: req.body.email
                }})
                if(!user) {
                    return res.status(403).json({
                        errors: "we don`t have any information for your account"
                    })
                }

                await User.update({
                    password: await cryptPassword(password.toString())
                }, {
                    where: {
                    email: req.body.email
                    }
                });

                return res.status(204).json()
            } catch (err) {
                next(err)
            }
        },
    }