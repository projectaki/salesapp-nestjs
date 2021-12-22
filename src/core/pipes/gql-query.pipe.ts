import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class GqlQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const fields = value?.fieldNodes[0]?.selectionSet?.selections;
    if (!fields) return [];
    const res = [];
    this.extractFields(fields, '', res);
    return res;
  }

  private extractFields = (arr: any[], prefix: string, res: string[]) => {
    const formattedPrefix = prefix === '' ? '' : prefix + '.';
    arr.forEach((x) => {
      const val = formattedPrefix + x.name.value;
      if (!x.selectionSet) {
        res.push(val);
      } else {
        this.extractFields(x.selectionSet.selections, val, res);
      }
    });
  };
}
