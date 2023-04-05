"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
        required: true
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
    prize: {
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
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });
const ProductModel = mongoose_1.default.model('Product', productSchema);
exports.default = ProductModel;
