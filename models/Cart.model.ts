import mongoose from "mongoose";

interface CartDoc extends Document{
    buyerId: string;
    cart: []
    isPaid: boolean;
}

const cartSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true,
    },
    cart: {
        type: Array,
        default: []
    },
    isPaid: {
        type: Boolean,
        default: false
    }
},{ timestamps: true }
);

const CartModel = mongoose.model<CartDoc>("Cart", cartSchema);
export default CartModel;