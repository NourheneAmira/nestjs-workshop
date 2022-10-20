import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
// classe  implemente pipe transforme / c est une classe injectable
@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
