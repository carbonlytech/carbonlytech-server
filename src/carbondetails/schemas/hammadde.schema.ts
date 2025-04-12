import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hammadde {
  @Prop() ad: string;
  @Prop() miktar: string;
  @Prop() birim: string;
  @Prop() donem?: string;
  @Prop() tedarik: string;
}

export const HammaddeSchema = SchemaFactory.createForClass(Hammadde);
export type HammaddeDocument = Hammadde & Document;
