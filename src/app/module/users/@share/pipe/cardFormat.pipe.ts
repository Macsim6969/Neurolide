import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFormat'
})
export class CardFormatPipe implements PipeTransform {
  transform(card: string, type: string): string {
    if (!card || card.length < 16) {
      return card;
    }
    
    const firstFour = card.slice(0, 4);
    const lastFour = card.slice(12, 25);
    const formattedCard = `${firstFour} **** **** ${lastFour}`;
    
    return `${formattedCard}`;
  }
}
