import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CarbondetailsService } from './carbondetails.service';
import { AuthGuard } from '@nestjs/passport';
import { CarbonDetails } from './schemas/carbondetails.schema';
import { CreateCarbonDetailsDto } from './dto/create-carbon-details.dto';

@Controller('carbondetails')
export class CarbondetailsController {
    constructor(private carbondetailsService: CarbondetailsService){}

    @Post("send-details")
    @UseGuards(AuthGuard("jwt"))
    async createCarbonDetails(
        @Body() carbonDetails: CreateCarbonDetailsDto,
        @Req() req,
    ): Promise<CarbonDetails>{
        return await this.carbondetailsService.create(carbonDetails, req.user);
    }
}
