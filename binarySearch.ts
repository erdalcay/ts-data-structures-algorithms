/**
 *  Binary Search
 * 
 *  #### Usage
 *      . Create an array of numbers in non-decreasing order.
 *      . Pass in a target number to look for within the array. 
 */

// EXAMPLES

//                                                                  
// Found                                list of nums      target
// // @ts-ignore                  /---------------------\  /-\         
type targetExists = BinarySearch<[1, 3, 5, 6, 6, 7, 9, 10], 5>; // Found at index 2


const nums = [1, 3, 5, 6, 6, 7, 9, 10] as const, target = 4;
// Not Found
// @ts-ignore - suppress infinite loop error
type targetDoesNotExist = BinarySearch<typeof nums, typeof target>; // Not found



/**
 * ==================================================
 * 
 *                  IMPLEMENTATION
 * 
 * ==================================================
 */

// 8; [0,0,0,0,1,0,0,0]
// 16; [0,0,0,1,0,0,0,0]

type ValueAt<
    A extends number[], 
    I extends number
> = A[I];

type Equal<A, B> = 
    A extends B ? B extends A ? true : false : false;

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
> = Length<A> extends [...(infer D), ...Length<B>] 
    ? D['length'] 
    : -1;

type LTE<
    A extends number, 
    B extends number
> = Equal<A, B> extends true 
    ? true 
    : Subtract<A, B> extends -1 ? true : false;

type DivideByTwo<
    A extends number, 
    R extends 0[] = []
> = LTE<A, 1> extends true 
    ? R['length'] 
    : DivideByTwo<Subtract<A, 2>, [0, ...R]>;

type MiddleIndex<
    L extends number, 
    R extends number
> = Add<L, DivideByTwo<Subtract<R, L>>>;

type BinarySearch<
    Nums extends readonly number[],  
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
    BinarySearch<Nums, T, Add<MiddleIndex<L, R>, 1>, R> // Search in right side.
    : // @ts-ignore
    BinarySearch<Nums, T, L, Subtract<MiddleIndex<L, R>, 1>> // Search in left side.
    ;
    

