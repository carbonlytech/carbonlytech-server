import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Yakit {
  @Prop() tip: string;
  @Prop() miktar: string;
  @Prop() birim: string;
  @Prop() donem: string;
}

export const YakitSchema = SchemaFactory.createForClass(Yakit);
export type YakitDocument = Yakit & Document;
