import { Injectable } from '@angular/core';
import { dyn } from 'src/app/data/dyn';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  isNone (value: any): boolean {
    return value === null || value === undefined;
  }

  findNone (obj: dyn, ...fields: string[]): string | undefined {
    return fields.find(field => this.isNone(obj[field]));
  }

  required (obj: dyn, ...fields: string[]): void {
    const field = this.findNone(obj, ...fields);
    if (!this.isNone(field)) {
      throw new Error(`'${obj.constructor.name}' must have the '${field}' field`);
    }
  }
}
