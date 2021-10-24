/**
 *  Binary Search
 * 
 *  #### Usage
 *      . List of numbers in non-decreasing order
 *      . First index of the list, hence always zero
 *      . Length of the list
 *      . Target number to look for within the list. 
 * 
 */

// EXAMPLES

//                                                                  list  
// Found                                list of nums          0     length   target
// // @ts-ignore                  /---------------------\    /-\     /-\      /-\         
type targetExists = BinarySearch<[1, 3, 5, 6, 6, 7, 9, 10],   0,      8,       5>; // Found at index 2


const nums = [1, 3, 5, 6, 6, 7, 9, 10] as const, target = 4;
// Not Found
// @ts-ignore - suppress infinite loop error
type targetDoesNotExist = BinarySearch<typeof nums, 0, typeof nums.length, typeof target>; // Not found



/**
 * ==================================================
 * 
 *                  IMPLEMENTATION
 * 
 * ==================================================
 */

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
> = Add<L, DivideByTwo<Subtract<R, L>>>

type BinarySearch<
    Nums extends readonly number[],  
    L extends number, 
    R extends number, 
    T extends number
> =
    LTE<L, R> extends false ? { found: false, index: -1 } // Base case
    : // @ts-ignore
    ValueAt<Nums, MiddleIndex<L, R>> extends T ? { found: true, index: MiddleIndex<L, R> } // Found
    : // @ts-ignore
    LTE<ValueAt<Nums, MiddleIndex<L, R>>, T> extends true 
    ? // @ts-ignore
    BinarySearch<Nums, Add<MiddleIndex<L, R>, 1>, R, T> // Search in right side.
    : // @ts-ignore
    BinarySearch<Nums, L, Subtract<MiddleIndex<L, R>, 1>, T> // Search in left side.
    ;
    
