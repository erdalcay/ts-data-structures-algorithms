// ~
// Preorder traversal of a binary tree(ish) data structure using
// only type annotations.
//

// USAGE

// Create a tree that looks like this ⥥
//                      
//                                    10
//                                  /    \
//                                 /      \
//                               20       70
//                              /  \     /
//                             /    \   /  
//                            30    60 80
//                           /  \
//                          /    \
//                         40    50
//
//                         preorder traversal ⟹ 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80
// ~
const BinaryTree = [
    {
        id: 0, left: 1, right: 2, value: 10
    },
    {
        id: 1, left: 3, right: 4, value: 20
    },
    {
        id: 2, left: 7, right: -1, value: 70
    },
    {
        id: 3, left: 5, right: 6, value: 30
    },
    {
        id: 4, left: -1, right: -1, value: 60
    },
    {
        id: 5, left: -1, right: -1, value: 40
    },
    {
        id: 6, left: -1, right: -1, value: 50
    },
    {
        id: 7, left: -1, right: -1, value: 80
    },
] as const;

type BinaryTree = typeof BinaryTree;

type preOrderTraversal = PreOrderTraversal<BinaryTree>; // ⟹ 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80

/**
 * ==================================================
 * 
 *                  IMPLEMENTATION
 * 
 * ==================================================
 */

interface TreeNode {
    id: number;
    left: number,
    right: number,
    value: number;
}

type NodeId = 'id';
type NodeValue = 'value';
type LeftChild = 'left';
type RightChild = 'right';

type NodeAt<
    Tree extends readonly TreeNode[], 
    I extends number
> = Tree[I];

type ValueOf<
    N extends TreeNode, 
    P extends keyof TreeNode
> = N[P];

type PreOrderTraversal<
    Tree extends readonly TreeNode[], 
    NodeIndex extends number = 0,
    S extends number[] = []
> = 
    NodeIndex extends - 1 
    ? [] 
    :
    [
        ValueOf<NodeAt<Tree, NodeIndex>, NodeValue>, 
        ...PreOrderTraversal<Tree, ValueOf<NodeAt<Tree, NodeIndex>, LeftChild>, S>,
        ...PreOrderTraversal<Tree, ValueOf<NodeAt<Tree, NodeIndex>, RightChild>, S>
    ]
    ;
