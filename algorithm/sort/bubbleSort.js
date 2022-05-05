function bubbleSort(arr) {
  const len = arr.length;
  if (len <= 1) return;

  for (let i = 0; i < len - 1; i++)
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

  return arr;
}

// 功能测试
const arr = [4, 3, 6, 2, 5, 7, 9, 8, 1]
bubbleSort(arr)
console.log(arr) // [1, 2, 3, 4, 5, 6, 7, 8, 9]