import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true, ref: 'users' })
  owner: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
