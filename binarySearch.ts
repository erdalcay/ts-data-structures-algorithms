// Binary Search Using Only Type Definitions

// Examples
//                                ordered list of numbers
// Found                           /-------------------\  target
// // @ts-ignore                  /---------------------\  /-\         
type targetExists = BinarySearch<[1, 3, 5, 6, 6, 7, 9, 10], 5>; // Found at index 2

// Not Found
// @ts-ignore - Suppress infinite loop error
type targetDoesNotExist = BinarySearch<[1, 3, 5, 7, 9, 10], -5>;


/**
 * ==================================================
 * 
 *                  IMPLEMENTATION
 * 
 * ==================================================
 */

type Length<
    A extends number, 
    R extends 0[] = []
> = A extends -1 ? [] : R['length'] extends A ? R : Length<A, [...R, 0]>;

type Add<
    A extends number, 
    B extends number
> = [...Length<A>, ...Length<B>]['length'];

type Subtract<
    A extends number, 
    B extends number
> = Length<A> extends [...(infer Delta), ...Length<B>] 
    ? Delta['length'] 
    : -1;

type DivideByTwo<
    A extends number, 
    R extends 0[] = []
> = LTE<A, 1> extends true 
    ? R['length'] 
    : DivideByTwo<Subtract<A, 2>, [0, ...R]>;

type Equal<A, B> = 
    A extends B ? B extends A ? true : false : false;

type LTE<
    A extends number, 
    B extends number
> = Equal<A, B> extends true 
    ? true 
    : Subtract<A, B> extends -1 ? true : false;

type ValueAt<
    A extends number[], 
    I extends number
> = A[I];

type MiddleIndex<
    L extends number, 
    R extends number
> = Add<L, DivideByTwo<Subtract<R, L>>>;

type BinarySearch<
    Nums extends number[],  
    T extends number,
    L extends number = 0, 
    R extends number = Nums['length'],
> =
    LTE<L, R> extends false ? { found: false, index: -1 } // Base case
    : // @ts-ignore
    ValueAt<Nums, MiddleIndex<L, R>> extends T ? { found: true, index: MiddleIndex<L, R> } // Found
    : // @ts-ignore
    LTE<ValueAt<Nums, MiddleIndex<L, R>>, T> extends true 
    ? // @ts-ignore
    BinarySearch<Nums, T, Add<MiddleIndex<L, R>, 1>, R> // Search on the right side.
    : // @ts-ignore
    BinarySearch<Nums, T, L, Subtract<MiddleIndex<L, R>, 1>> // Search on the left side.
    ;
