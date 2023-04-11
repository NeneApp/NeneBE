import mongoose from "mongoose";

interface ProductDoc extends Document {
    name: string;
    store_id: string;
    brand: string;
    quantity: number;
    description: string;
    code: string;
    slug: string;
    prize: number;
    discount: number;
    attribute: [];
    is_sold: boolean;
    category: string;
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    store_id: {
        type: String,
        required: true
    
    },
    brand: {
        type: String,
        required: ["Please enter the product brand"]
    },
    quantity: {
        type: Number,
        required:  true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    arrtibute: {
        type: Array,
        default: []
    },
    is_sold: {
        type: Boolean,
        required: true,
    },
    category:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category'
        }
      ]
},
{timestamps: true});

const ProductModel = mongoose.model<ProductDoc>('Product', productSchema);

export default ProductModel;