/**
 * 数据结构转换
传入一个这样的数据结构
[
{ id: 1, parentId: null},
{ id: 2, parentId: 1 },
{ id: 3, parentId: 1 },
{ id: 4, parentId: 2 },
{ id: 5, parentId: 2 },
{ id: 6, parentId: 3 },
]
 输出如下结果:
{
id: 1, 
children: [
    { id: 2, children: [ { id: 4, children: [] }, { id: 5, children: [] } ] },
    { id: 3, children: [ { id: 6, children: [] } ] }
]
} 

 */


const convert = (items) => {
  let arr = [];
  let map = new Map();
  for (let i = 0; i < items?.length; i++) {
    let item = { id: items[i]?.id, children: [] };
    arr.push(item);
    map.set(items[i]?.id, item);
  }

  for (let i = 0; i < items?.length; i++) {
    if (items[i].parentId) {
      let parent = map.get(items[i].parentId);
      parent.children.push(arr[i]);
    }
  }

  console.log(arr[0])
  console.log(JSON.stringify(arr[0]))
}

let test = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 6, parentId: 3 },
];

convert(test);