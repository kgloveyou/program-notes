/**
 * 快速排序 (splice)
 * @param arr
 * @returns
 */
function quickSort1(arr: number[]): number[] {
  const len = arr.length;
  if (len === 0) return arr;

  const midIndex = Math.floor(len / 2);
  const midValue = arr.splice(midIndex, 1)[0];

  const left: number[] = [];
  const right: number[] = [];

  // 注意： splice 会修改原数组，所以用 arr.length
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (n < midValue) {
      left.push(n);
    } else {
      right.push(n);
    }
  }
  return quickSort1(left).concat([midValue], quickSort1(right));
}

// 作者：摆草猿
// 链接：https://juejin.cn/post/7088725301974269960
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 功能测试
const testArr3 = [3, 2, 5, 1, 1, 8, 7];
console.info("quickSort1:", quickSort1(testArr3));
