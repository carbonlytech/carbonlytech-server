import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarbondetailsService } from './carbondetails.service';
import { CarbondetailsController } from './carbondetails.controller';
import {
  CarbonDetails,
  CarbonDetailsSchema,
} from './schemas/carbondetails.schema';
import { Firma, FirmaSchema } from './schemas/firma.schema';
import { Enerji, EnerjiSchema } from './schemas/enerji.schema';
import { Yakit, YakitSchema } from './schemas/yakit.schema';
import { Hammadde, HammaddeSchema } from './schemas/hammadde.schema';
import { Emisyon, EmisyonSchema } from './schemas/emisyon.schema';
import {
  AtikGeriDonusum,
  AtikGeriDonusumSchema,
} from './schemas/atik-geri-donusum.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: CarbonDetails.name, schema: CarbonDetailsSchema },
      { name: Firma.name, schema: FirmaSchema },
      { name: Enerji.name, schema: EnerjiSchema },
      { name: Yakit.name, schema: YakitSchema },
      { name: Hammadde.name, schema: HammaddeSchema },
      { name: Emisyon.name, schema: EmisyonSchema },
      { name: AtikGeriDonusum.name, schema: AtikGeriDonusumSchema },
    ]),
  ],
  providers: [CarbondetailsService],
  controllers: [CarbondetailsController],
})
export class CarbonDetailsModule {}
