import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true, ref: User.name, type: Types.ObjectId })
  owner: User | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
