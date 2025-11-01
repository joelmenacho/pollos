import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}
  @Post('create-intent')
  create(@Body() body: { amount: number; currency?: string }) {
    const cents = Math.max(1, Math.round((body.amount || 0) * 100));
    return this.svc.createPaymentIntent(cents, body.currency ?? 'pen');
  }
}
