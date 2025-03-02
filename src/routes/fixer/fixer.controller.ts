import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FixerService } from './fixer.service';
import { FixerAssignmentService } from './fixer-assignment.service';
import { FixerAvailabilityResponseDto } from './dto/fixer-assignment.dto';

@Controller('fixer')
export class FixerController {
  constructor(
    private readonly fixerService: FixerService,
    private readonly fixerAssignmentService: FixerAssignmentService,
  ) {}

  @Get('fetch-data/:id')
  fetchFixerData(@Param('id') id: string) {
    return this.fixerService.fetchFixerData(id);
  }

  @Get('available')
  async findFixers(
    @Query('serviceIds') serviceIds: string,
    @Query('workDateTime') workDateTime: string,
    @Query('estimatedDuration', ParseIntPipe) estimatedDuration: number,
  ): Promise<FixerAvailabilityResponseDto> {
    const parsedServiceIds = serviceIds.split(',').map(id => parseInt(id));
    const parsedDateTime = new Date(workDateTime);

    return this.fixerAssignmentService.findAvailableFixers(
      parsedServiceIds,
      parsedDateTime,
      estimatedDuration,
    );
  }

  @Post('assign')
  async assignFixerToOrder(
    @Body() assignmentData: {
      orderId: number;
      fixerId: number;
      startTime: string;
      estimatedDuration: number;
    },
  ) {
    const { orderId, fixerId, startTime, estimatedDuration } = assignmentData;
    const parsedStartTime = new Date(startTime);

    return this.fixerAssignmentService.assignFixerToOrder(
      orderId,
      fixerId,
      parsedStartTime,
      estimatedDuration,
    );
  }
}
