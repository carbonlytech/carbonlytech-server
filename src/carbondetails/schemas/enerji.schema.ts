import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Enerji {
  @Prop() elektrikKullaniliyor: boolean;
  @Prop() dogalgazKullaniliyor: boolean;
  @Prop() komurKullaniliyor: boolean;

  @Prop() elektrikMiktar: string;
  @Prop() dogalgazMiktar: string;
  @Prop() komurMiktar: string;

  @Prop() elektrikBirim: string;
  @Prop() dogalgazBirim: string;
  @Prop() komurBirim: string;

  @Prop() elektrikKaynak: string;

  @Prop() elektrikDonem: string;
  @Prop() dogalgazDonem: string;
  @Prop() komurDonem: string;
}

export const EnerjiSchema = SchemaFactory.createForClass(Enerji);
export type EnerjiDocument = Enerji & Document;
