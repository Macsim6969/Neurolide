import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCardNumber'
})
export class FormatCardNumberPipe implements PipeTransform {
  transform(cardNumber: number): string {
    if (!cardNumber && cardNumber !== 0) return '';
    const cardNumberString = cardNumber.toString();
    const lastFourDigits = cardNumberString.slice(-4);
    const formatted = '**** **** **** ' + lastFourDigits;
    return formatted;
  }
}
