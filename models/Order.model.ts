import mongoose from "mongoose"

interface OrderDoc extends Document {
    userId: string,
    products: object[],
    amount: number,
    address: string,
    status: string
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
          productId: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      amount: {
        type: Number,
        require: true
      },
      address: {
        type: String,
        required: true
      },
      status: {
        type: true,
        default: 'PENDING'
      }
      
}) 

const OrderModel = mongoose.model<OrderDoc>("Order", orderSchema);

export default OrderModel;
