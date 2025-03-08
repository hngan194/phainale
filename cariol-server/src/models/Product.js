const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({   
        name: {
            type: String,
            required: true,
            minlength: 5,
        }, 
        amount: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        // images:{
        //     data : Buffer,
        //     contentType : String,
        // },
        image : {
            type: String,
        },
        description : {
            type: String,
        },
        categoryId : {
            type : Schema.Types.ObjectId,
            ref : 'Category',
            required: true,
        }
    }, 
    {   timestamps: true, 
        versionKey: false,
    })

// const Product = mongoose.model('Product', {name: String, price: number})

productSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productSchema)

module.exports = { Product }
