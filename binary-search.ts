/**
 *  Binary Search Using Only Type Definitions
 * 
 *  #### Usage
 *      . List of numbers in non-decreasing order
 *      . First index of the list, hence always zero
 *      . Last index of the list
 *      . Target number to look for within the list. 
 * 
 */

// EXAMPLES

//                                                                 last  
// Found                                list of nums          0    index  target
// // @ts-ignore                  /---------------------\    /-\    /-\    /-\         
type targetExists = BinarySearch<[1, 3, 5, 6, 6, 7, 9, 10],   0,     7,     5>; // Found at index 2

// Not Found
// @ts-ignore - Suppress infinite loop error
type targetDoesNotExist = BinarySearch<[1, 3, 5, 7, 9, 10], 0, 5, -5>; // Not found



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
> = Add<L, DivideByTwo<Subtract<R, L>>>;

type BinarySearch<
    Nums extends number[], 
    L extends number, 
    R extends number, 
    T extends number
> =
    LTE<L, R> extends false ? [false, -1] // Base case
    : // @ts-ignore
    ValueAt<Nums, MiddleIndex<L, R>> extends T ? [true, MiddleIndex<L, R>] // Found
    : // @ts-ignore
    LTE<ValueAt<Nums, MiddleIndex<L, R>>, T> extends true 
    ? // @ts-ignore
    BinarySearch<Nums, Add<MiddleIndex<L, R>, 1>, R, T> // Search in right side.
    : // @ts-ignore
    BinarySearch<Nums, L, Subtract<MiddleIndex<L, R>, 1>, T> // Search in left side.
    ;
 
