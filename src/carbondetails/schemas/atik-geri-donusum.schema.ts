import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AtikGeriDonusum {
  @Prop() atikMiktari: string;
  @Prop() geriDonusumOrani: string;
  @Prop() atikTipi: string;
}

export const AtikGeriDonusumSchema = SchemaFactory.createForClass(AtikGeriDonusum);
export type AtikGeriDonusumDocument = AtikGeriDonusum & Document;
