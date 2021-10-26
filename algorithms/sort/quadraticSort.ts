// ~
// Bubble sort (N^2 ops hence the name `quadratic sort`) using only type annotations.
// ~

// USAGE

const UnsortedArray = [3, 2, 15, 1, 25, 9] as const;

type UnsortedArray = typeof UnsortedArray;

type sortedArray = QuadraticSort<UnsortedArray>; // ⟹ [1, 2, 3, 9, 15, 25]

/**
 * ==================================================
 * 
 *                  IMPLEMENTATION
 * 
 * ==================================================
 */

type ValueAt<
    N extends number[], 
    I extends number
> = 
    N[I];

type Length<
    N extends number,
    S extends any[] = []
> = 
    S['length'] extends N 
    ? S 
    : Length<N, [any, ...S]>;

type Add<
    A extends number,
    B extends number
> = 
    [...Length<A>, ...Length<B>]['length'];

type Subtract<
    A extends number,
    B extends number
> = 
    Length<A> extends [...(infer D), ...Length<B>]
    ? D['length'] 
    : -1;

type LT<
    A extends number,
    B extends number
> = 
    Subtract<A, B> extends -1 ? true : false;

type LTE<
    A extends number,
    B extends number
> = 
    Length<A> extends Length<B> 
    ? true 
    : Subtract<A, B> extends -1 
    ? true 
    : false;

type Slice<
    N extends number[],
    I extends number,
    J extends number = N['length'],
    S extends number[] = []
> = 
    I extends J 
    ? S
    // @ts-ignore
    : Slice<N, Add<I, 1>, J, [...S, ValueAt<N, I>]>;

type SwapNeighbors<
    N extends number[],
    I extends number,
    J extends number
> = 
    // @ts-ignore
    [...Slice<N, 0, I>, ValueAt<N, J>, ValueAt<N, I>, ...Slice<N, Add<J, 1>>];

type QuadraticSort<
    N extends readonly number[],
    S extends number[] = [...N],
    I extends number = 0,
    J extends number = 0
> = 
    LT<I, S['length']> extends false 
    ?  S 
    : LT<J, Subtract<S['length'], 1>> extends false 
    // @ts-ignore
    ? QuadraticSort<S, S, Add<I, 1>, 0>
    // @ts-ignore
    : LT<ValueAt<S, J>, ValueAt<S,  Add<J, 1>>> extends false
    // @ts-ignore
    ? QuadraticSort<N, SwapNeighbors<S, J, Add<J, 1>>, I, Add<J, 1>>
    // @ts-ignore
    : QuadraticSort<N, S, I, Add<J, 1>>;
  
