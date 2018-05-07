import { diff } from 'deep-diff';

export default function difference(first: any, base: any) {
  return diff(first, base);
}
