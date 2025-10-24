import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
  standalone: true,
})
export class ParseDatePipe implements PipeTransform {
  transform(value: string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    // Divide a string "dd/MM/yyyy" em partes
    const parts = value.split('/');
    if (parts.length !== 3) {
      return null;
    }

    // new Date() espera (ano, mês - 1, dia)
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês em JS é base 0
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }
}
