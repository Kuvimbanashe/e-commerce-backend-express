import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: { product: mongoose.Schema.Types.ObjectId; quantity: number }[];                                                                                                                                                                                                               

}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
