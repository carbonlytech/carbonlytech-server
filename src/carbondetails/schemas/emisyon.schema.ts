import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Emisyon {
  @Prop() surecTipi: string;
  @Prop() emisyonFaktoru: string;
  @Prop() co2: string;
  @Prop() ch4: string;
  @Prop() n2o: string;
}

export const EmisyonSchema = SchemaFactory.createForClass(Emisyon);
export type EmisyonDocument = Emisyon & Document;
