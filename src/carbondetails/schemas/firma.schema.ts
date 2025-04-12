import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Firma {
  @Prop() lokasyon: string;
  @Prop() sektor: string;
  @Prop() cbam: boolean;
  @Prop() urun: string;
  @Prop() miktar: string;
  @Prop() birim: string;
  @Prop() uretimDonem: string;
}

export const FirmaSchema = SchemaFactory.createForClass(Firma);
export type FirmaDocument = Firma & Document;
