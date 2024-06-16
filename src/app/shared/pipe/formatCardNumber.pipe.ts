import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCardNumber'
})
export class FormatCardNumberPipe implements PipeTransform {
  transform(cardNumber: number, rules: 'start' | 'center'): string {
    if (rules === 'start') {
      if (!cardNumber && cardNumber !== 0) return '';
      const cardNumberString = cardNumber.toString();
      const lastFourDigits = cardNumberString.slice(-4);
      const formatted = '**** **** **** ' + lastFourDigits;
      return formatted;
    } else {
      if (!cardNumber && cardNumber !== 0) return '';
      const cardNumberString = cardNumber.toString();
      const firstFourDigits = cardNumberString.slice(0, 4);
      const lastFourDigits = cardNumberString.slice(-4);
      const formatted = firstFourDigits + ' **** **** ' + lastFourDigits;
      return formatted;
    }

  }
}
