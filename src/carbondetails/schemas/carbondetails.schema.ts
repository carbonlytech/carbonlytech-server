import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Firma } from './firma.schema';
import { Enerji } from './enerji.schema';
import { Yakit, YakitSchema } from './yakit.schema'; // Buraya YakitSchema'yı import edin
import { Hammadde, HammaddeSchema } from './hammadde.schema'; // Buraya HammaddeSchema'yı import edin
import { Emisyon } from './emisyon.schema';
import { AtikGeriDonusum } from './atik-geri-donusum.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class CarbonDetails extends Document {
  @Prop({ type: Firma })
  firma: Firma;

  @Prop({ type: Enerji })
  enerji: Enerji;

  @Prop({
    type: {
      yakitlar: [YakitSchema], // YakitSchema'yı burada kullanıyoruz
      hammaddeler: [HammaddeSchema], // HammaddeSchema'yı burada kullanıyoruz
    },
  })
  yakitHammadde: { yakitlar: Yakit[]; hammaddeler: Hammadde[] };
  

  @Prop({ type: Emisyon })
  emisyon: Emisyon;

  @Prop({ type: AtikGeriDonusum })
  atikGeriDonusum: AtikGeriDonusum;

  @Prop({type: Number})
  karbonAyakIzi: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CarbonDetailsSchema = SchemaFactory.createForClass(CarbonDetails);
export type CarbonDetailsDocument = CarbonDetails & Document;
