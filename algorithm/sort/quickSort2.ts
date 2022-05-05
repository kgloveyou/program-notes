/**
 * 快速排序 (slice)
 * @param arr
 * @returns
 */
function quickSort2(arr: number[]): number[] {
  const len = arr.length;
  if (len === 0) return arr;

  const midIndex = Math.floor(len / 2);
  // const midValue = arr.slice(midIndex, midIndex + 1)[0];
  // or
  const midValue = arr[midIndex];

  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < len; i++) {
    const n = arr[i];
    if (i === midIndex) continue;
    if (n < midValue) {
      left.push(n);
    } else {
      right.push(n);
    }
  }
  return quickSort2(left).concat([midValue], quickSort2(right));
}

// 功能测试
const testArr4 = [3, 2, 5, 1, 1, 8, 7];
console.info("quickSort2:", quickSort2(testArr4)); //quickSort2: [ 1, 2, 3, 5, 7, 8 ]

// 作者：摆草猿
// 链接：https://juejin.cn/post/7088725301974269960
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
