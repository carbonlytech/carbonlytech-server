import { Injectable } from '@nestjs/common';
import { CarbonDetails } from './schemas/carbondetails.schema';
import { CreateCarbonDetailsDto } from './dto/create-carbon-details.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CarbondetailsService {
  constructor(
    @InjectModel(CarbonDetails.name)
    private carbonDetailsModel: mongoose.Model<CarbonDetails>,
  ) {}

  // DTO'yu Mongoose modeline dönüştürme
  async create(
    createCarbonDetailsDto: CreateCarbonDetailsDto,
    user: any,
  ): Promise<CarbonDetails> {
    try {
      // CarbonDetails schema'da firma ve enerji gibi alanların doğru şekilde tanımlandığından emin olun
      const carbonDetails = new this.carbonDetailsModel({
        firma: {
          lokasyon: createCarbonDetailsDto.firma.lokasyon,
          sektor: createCarbonDetailsDto.firma.sektor,
          cbam: createCarbonDetailsDto.firma.cbam,
          urun: createCarbonDetailsDto.firma.urun,
          miktar: createCarbonDetailsDto.firma.miktar,
          birim: createCarbonDetailsDto.firma.birim,
          uretimDonem: createCarbonDetailsDto.firma.uretimDonem,
        },
        enerji: {
          elektrikKullaniliyor:
            createCarbonDetailsDto.enerji.elektrikKullaniliyor,
          dogalgazKullaniliyor:
            createCarbonDetailsDto.enerji.dogalgazKullaniliyor,
          komurKullaniliyor: createCarbonDetailsDto.enerji.komurKullaniliyor,
          elektrikMiktar: createCarbonDetailsDto.enerji.elektrikMiktar,
          dogalgazMiktar: createCarbonDetailsDto.enerji.dogalgazMiktar,
          komurMiktar: createCarbonDetailsDto.enerji.komurMiktar,
          elektrikBirim: createCarbonDetailsDto.enerji.elektrikBirim,
          dogalgazBirim: createCarbonDetailsDto.enerji.dogalgazBirim,
          komurBirim: createCarbonDetailsDto.enerji.komurBirim,
          elektrikKaynak: createCarbonDetailsDto.enerji.elektrikKaynak,
          elektrikDonem: createCarbonDetailsDto.enerji.elektrikDonem,
          dogalgazDonem: createCarbonDetailsDto.enerji.dogalgazDonem,
          komurDonem: createCarbonDetailsDto.enerji.komurDonem,
        },
        yakitHammadde: {
          yakitlar: createCarbonDetailsDto.yakitHammadde.yakitlar.map(
            (yakit) => ({
              tip: yakit.tip,
              miktar: yakit.miktar,
              birim: yakit.birim,
              donem: yakit.donem,
            }),
          ),
          hammaddeler: createCarbonDetailsDto.yakitHammadde.hammaddeler.map(
            (hammadde) => ({
              ad: hammadde.ad,
              miktar: hammadde.miktar,
              birim: hammadde.birim,
              donem: hammadde.donem,
              tedarik: hammadde.tedarik,
            }),
          ),
        },
        emisyon: {
          surecTipi: createCarbonDetailsDto.emisyon.surecTipi,
          emisyonFaktoru: createCarbonDetailsDto.emisyon.emisyonFaktoru,
          co2: createCarbonDetailsDto.emisyon.co2,
          ch4: createCarbonDetailsDto.emisyon.ch4,
          n2o: createCarbonDetailsDto.emisyon.n2o,
        },
        atikGeriDonusum: {
          atikMiktari: createCarbonDetailsDto.atikGeriDonusum.atikMiktari,
          geriDonusumOrani:
            createCarbonDetailsDto.atikGeriDonusum.geriDonusumOrani,
          atikTipi: createCarbonDetailsDto.atikGeriDonusum.atikTipi,
        },
        karbonAyakIzi: createCarbonDetailsDto.karbonAyakIzi ?? null,
        user: user._id,
      });

      const createdCarbonDetails =
        await this.carbonDetailsModel.create(carbonDetails);
      return createdCarbonDetails;
    } catch (error) {
      console.error('Error creating carbon details:', error);
      throw error;
    }
  }

  async update(
    id: string,
    dto: CreateCarbonDetailsDto,
    userId: string,
  ): Promise<CarbonDetails> {
    const existing = await this.carbonDetailsModel.findOne({
      _id: id,
      user: userId,
    });

    if (!existing) {
      throw new Error(
        'Güncelleme başarısız: Kayıt bulunamadı veya yetkiniz yok.',
      );
    }

    // DTO'ya uygun alanları güncelle
    Object.assign(existing, dto);

    return await existing.save();
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.carbonDetailsModel.deleteOne({ _id: id, user: userId });
  
    if (result.deletedCount === 0) {
      return false;
    }
  
    return true;
  }

  async getAllCarbonDetailsByUser(userId: string): Promise<CarbonDetails[]> {
    return await this.carbonDetailsModel.find({ user: userId }).exec();
  }

  async getOneCarbonDetailByUser(
    carbonDetailId: string,
    userId: string,
  ): Promise<CarbonDetails> {
    const carbonDetail = await this.carbonDetailsModel
      .findOne({ _id: carbonDetailId, user: userId })
      .exec();

    if (!carbonDetail) {
      throw new Error('Kayıt bulunamadı veya yetkiniz yok');
    }

    return carbonDetail;
  }
}
