// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  constructor() {
    if (!process.env.STRIPE_SECRET) throw new Error('STRIPE_SECRET no definida');
    this.stripe = new Stripe(process.env.STRIPE_SECRET);
  }

  async createPaymentIntent(amountInCents: number, currency: string = 'pen') {
    const intent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return { clientSecret: intent.client_secret };
  }
}
