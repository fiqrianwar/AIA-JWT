const { Category, db } = require('../../databases/models'),
    { Op } = require("sequelize");

module.exports = {
    create: async (req,res,next) => {
        try {
            const data = await Category.create(req.body)

            return res.status(201).json({
                data
            })
        } catch (err) {
            next(err)
        }
    },
    findById: async (req,res,next) => {
        try {

            const data = await Category.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!data) {
                return res.status(404).json({
                    errors: "data not found"
                })
            }

            return res.status(201).json({
                data
            })
        } catch (err) {
            next(err)
        }
    },
    update: async (req,res,next) => {
        try {
            await Category.update({
                name: req.body.name,
                is_active: req.body.is_active
            }, {
                where: {
                    id: req.body.id
                }
            })

            return res.status(204).json()
        } catch (err) {
            next(err)
        }
    },
    destroy: async (req,res,next) => {
        try {
            const data = await Category.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!data) {
                return res.status(404).json({
                    errors: "data not found"
                })
            }
            
            await Category.destroy({
                where: {
                  id: req.params.id
                }
            });

            return res.status(204).json()
        } catch (err) {
            next(err)
        }
    },
    list: async (req,res,next) => {
        try {
            const { page, take, name, is_active } = req.query;
            let condition = {
                ...(name && {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }),
                ...(is_active && {
                    is_active
                }),
            }

            let paginate = 0;
            let limit = take ?? 10;
            

            if(page > 1) {
                paginate = parseInt(page)
            }

            const data = await Category.findAndCountAll({ 
                where: condition,
                limit,
                offset: paginate
            });

            return res.status(200).json({
                data: data.rows,
                current_page : paginate === 0 ? 1 : paginate,
                total_item: data.count,
                total_page: Math.ceil(data.count / limit)
            })
        } catch (err) {
            next(err)
        }
    }
}