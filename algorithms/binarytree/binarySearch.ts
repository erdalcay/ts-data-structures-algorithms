// ~
// Binary search inside a binary tree.
//

// USAGE

// Create a tree that looks like this ⥥
//                      
//                                    6
//                                   / \
//                                  /   \
//                                4      7
//                               / \      \
//                              /   \      \  
//                             2     5      9
//                            / \
//                           /   \
//                          1     3
//
// ~
const BinaryTree = [
    {
        id: 0, left: 1, right: 2, value: 6
    },
    {
        id: 1, left: 3, right: 4, value: 4
    },
    {
        id: 2, left: -1, right: 7, value: 7
    },
    {
        id: 3, left: 5, right: 6, value: 2
    },
    {
        id: 4, left: -1, right: -1, value: 5
    },
    {
        id: 5, left: -1, right: -1, value: 1
    },
    {
        id: 6, left: -1, right: -1, value: 3
    },
    {
        id: 7, left: -1, right: -1, value: 9
    },
] as const;

type BinaryTree = typeof BinaryTree;

// @ts-ignore
type searchResult = BinarySearch<BinaryTree, 3>; // found: true

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

type Length<
    A extends number, 
    R extends 0[] = []
> = A extends -1 ? [] : R['length'] extends A ? R : Length<A, [...R, 0]>;

type Subtract<
    A extends number, 
    B extends number
> = Length<A> extends [...(infer D), ...Length<B>] 
    ? D['length'] 
    : -1;

type LT<
    A extends number, 
    B extends number
> = Subtract<A, B> extends -1 ? true : false;

type BinarySearch<
    Tree extends readonly TreeNode[],  
    Target extends number,
    Root extends number = 0,
> =
    ValueOf<NodeAt<Tree, Root>, NodeValue> extends - 1 ? { found: false, node: null }
    :
    ValueOf<NodeAt<Tree, Root>, NodeValue> extends Target ? { found: true, node: NodeAt<Tree, Root> }
    :
    LT<ValueOf<NodeAt<Tree, Root>, NodeValue>, Target> extends true ? BinarySearch<Tree, Target, ValueOf<NodeAt<Tree, Root>, RightChild>>
    :
    BinarySearch<Tree, Target, ValueOf<NodeAt<Tree, Root>, LeftChild>>
    ;
  
