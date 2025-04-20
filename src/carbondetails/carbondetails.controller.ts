import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CarbondetailsService } from './carbondetails.service';
import { AuthGuard } from '@nestjs/passport';
import { CarbonDetails } from './schemas/carbondetails.schema';
import { CreateCarbonDetailsDto } from './dto/create-carbon-details.dto';

@Controller('carbondetails')
export class CarbondetailsController {
  constructor(private carbondetailsService: CarbondetailsService) {}

  @Post('send-details')
  @UseGuards(AuthGuard('jwt'))
  async createCarbonDetails(
    @Body() carbonDetails: CreateCarbonDetailsDto,
    @Req() req,
  ): Promise<CarbonDetails> {
    return await this.carbondetailsService.create(carbonDetails, req.user);
  }

  @Patch('update-details/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateCarbonDetails(
    @Param('id') id: string,
    @Body() updateCarbonDetailsDto: CreateCarbonDetailsDto,
    @Req() req,
  ): Promise<CarbonDetails> {
    const userId = req.user._id;
    return await this.carbondetailsService.update(
      id,
      updateCarbonDetailsDto,
      userId,
    );
  }

  @Delete('delete-details/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCarbonDetails(
    @Param('id') id: string,
    @Req() req,
  ): Promise<{ message: string }> {
    const userId = req.user._id;
    const result = await this.carbondetailsService.delete(id, userId);
    if (!result) {
      throw new HttpException(
        'Kayıt bulunamadı veya yetkiniz yok.',
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'Kayıt başarıyla silindi.' };
  }

  @Get('getAllDetails')
  @UseGuards(AuthGuard('jwt'))
  async getAllCarbonDetails(@Req() req): Promise<CarbonDetails[]> {
    const userId = req.user._id;
    return await this.carbondetailsService.getAllCarbonDetailsByUser(userId);
  }

  @Get('getDetail/:id')
  @UseGuards(AuthGuard('jwt'))
  async getCarbonDetailById(
    @Param('id') carbonDetailId: string,
    @Req() req,
  ): Promise<CarbonDetails> {
    const userId = req.user._id;
    return await this.carbondetailsService.getOneCarbonDetailByUser(
      carbonDetailId,
      userId,
    );
  }
}
