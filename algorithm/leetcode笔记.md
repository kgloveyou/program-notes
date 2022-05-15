# leetcode笔记

## 二叉树

### [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)

二叉搜索树的三个特性：
这些性质最好在面试之前了解清楚：

- 二叉搜索树的中序遍历的序列是递增排序的序列。中序遍历的遍历次序：`Left -> Node -> Right`。

  ```java
  public LinkedList<Integer> inorder(TreeNode root, LinkedList<Integer> arr) {
    if (root == null) return arr;
    inorder(root.left, arr);
    arr.add(root.val);
    inorder(root.right, arr);
    return arr;
  } 
  ```

  

- `Successor` 代表的是中序遍历序列的下一个节点。即比当前节点大的最小节点，简称**后继节点**。 先取当前节点的右节点，然后一直取该节点的左节点，直到左节点为空，则最后指向的节点为后继节点。

  ```java
  public int successor(TreeNode root) {
    root = root.right;
    while (root.left != null) root = root.left;
    return root;
  } 
  ```

  

- `Predecessor` 代表的是中序遍历序列的前一个节点。即比当前节点小的最大节点，简称**前驱节点**。先取当前节点的左节点，然后取该节点的右节点，直到右节点为空，则最后指向的节点为前驱节点。

```java
public int predecessor(TreeNode root) {
  root = root.left;
  while (root.right != null) root = root.right;
  return root;
} 
```



*注意：官方题解给的找后继与前驱节点的函数，都是为了找更低层的节点来进行替换。**并不是严格意义上的后继和前驱节点**。*

作者：LeetCode
链接：https://leetcode.cn/problems/delete-node-in-a-bst/solution/shan-chu-er-cha-sou-suo-shu-zhong-de-jie-dian-by-l/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



