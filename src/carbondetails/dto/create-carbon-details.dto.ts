import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
  IsDefined,
  IsEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/auth/schemas/user.schema';

// Firma DTO
class FirmaDto {
  @IsString() lokasyon: string;
  @IsString() sektor: string;
  @IsBoolean() cbam: boolean;
  @IsString() urun: string;
  @IsString() miktar: string;
  @IsString() birim: string;
  @IsString() uretimDonem: string;
}

// Enerji DTO
class EnerjiDto {
  @IsBoolean() elektrikKullaniliyor: boolean;
  @IsBoolean() dogalgazKullaniliyor: boolean;
  @IsBoolean() komurKullaniliyor: boolean;

  @IsOptional() @IsString() elektrikMiktar?: string;
  @IsOptional() @IsString() dogalgazMiktar?: string;
  @IsOptional() @IsString() komurMiktar?: string;

  @IsOptional() @IsString() elektrikBirim?: string;
  @IsOptional() @IsString() dogalgazBirim?: string;
  @IsOptional() @IsString() komurBirim?: string;

  @IsOptional() @IsString() elektrikKaynak?: string;

  @IsOptional() @IsString() elektrikDonem?: string;
  @IsOptional() @IsString() dogalgazDonem?: string;
  @IsOptional() @IsString() komurDonem?: string;
}

// Yakit DTO
class YakitDto {
  @IsOptional() @IsString() tip: string;
  @IsOptional() @IsString() miktar: string;
  @IsOptional() @IsString() birim: string;
  @IsOptional() @IsString() donem: string;
}

// Hammadde DTO
class HammaddeDto {
  @IsOptional() @IsString() ad: string;
  @IsOptional() @IsString() miktar: string;
  @IsOptional() @IsString() birim: string;
  @IsOptional() @IsString() donem?: string;
  @IsOptional() @IsString() tedarik: string;
}

// Nested Yakit + Hammadde DTO
class YakitHammaddeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YakitDto)
  yakitlar: YakitDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HammaddeDto)
  hammaddeler: HammaddeDto[];
}

// Emisyon DTO
class EmisyonDto {
  @IsString() surecTipi: string;
  @IsOptional() @IsString() emisyonFaktoru: string;
  @IsOptional() @IsString() co2: string;
  @IsOptional() @IsString() ch4: string;
  @IsOptional() @IsString() n2o: string;
}

// Atık & Geri Dönüşüm DTO
class AtikGeriDonusumDto {
  @IsOptional() @IsString() atikMiktari: string;
  @IsOptional() @IsString() geriDonusumOrani: string;
  @IsOptional() @IsString() atikTipi: string;
}

// Ana DTO
export class CreateCarbonDetailsDto {
  @ValidateNested()
  @Type(() => FirmaDto)
  firma: FirmaDto;

  @ValidateNested()
  @Type(() => EnerjiDto)
  enerji: EnerjiDto;

  @ValidateNested()
  @Type(() => YakitHammaddeDto)
  yakitHammadde: YakitHammaddeDto;

  @ValidateNested()
  @Type(() => EmisyonDto)
  emisyon: EmisyonDto;

  @ValidateNested()
  @Type(() => AtikGeriDonusumDto)
  atikGeriDonusum: AtikGeriDonusumDto;

  @IsOptional()
  @IsNumber()
  karbonAyakIzi?: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
