// function isSame(a: any, b: any) {
//   if (a.length != b.length) return false;
//   if (
//     a.filter(function(i: any) {
//       return a.indexOf(i) < 0;
//     }).length > 0
//   )
//     return false;
//   if (
//     b.filter(function(i: any) {
//       return a.indexOf(i) < 0;
//     }).length > 0
//   )
//     return false;
//   return true;
// }
// export default function subtract(a: any, b: any) {
//   var r = {};
//   for (var key in b) {
//     if (Array.isArray(b[key])) {
//       if (!a[key]) a[key] = [];
//       if (!isSame(a[key], b[key])) r[key] = a[key];
//     } else if (typeof b[key] == 'object') {
//       if (!a[key]) a[key] = {};
//       r[key] = subtract(a[key], b[key]);
//     } else {
//       if (b[key] != a[key]) {
//         r[key] = a[key];
//       }
//     }
//   }
//   return r;
// }

import * as _ from 'lodash';
import { diff } from 'deep-diff';

export default function difference(first: any, base: any) {
  // var rhs = {
  //   address: [{ landmark: 'santosh sir', line4: 'fsa' }],
  //   firstName: 'jazza'
  // };
  // var lhs = {
  //   address: [{ landmark: 'santosh sir', line4: 'fsa1' }],
  //   firstName: 'jazza'
  // };
  return diff(first, base);
}
