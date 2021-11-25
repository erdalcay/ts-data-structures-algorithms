type NOT<
    A extends 0 | 1
> = 
    A extends 1 ? 0 : 1;

type AND<
    A extends 0 | 1,
    B extends 0 | 1
> = 
    A extends 1 
    ? 
    (B extends 1 ? 1 : 0) 
    : 
    0;

type NAND<
    A extends 0 | 1,
    B extends 0 | 1
> =
    NOT<AND<A, B>>;

type OR<
    A extends 0 | 1,
    B extends 0 | 1
> =
    A extends 1 
    ?
    1
    :
    (B extends 1 ? 1 : 0); 

type NOR<
    A extends 0 | 1,
    B extends 0 | 1
> =
    NOT<OR<A, B>>;

type XOR<
    A extends 0 | 1,
    B extends 0 | 1
> = 
    A extends 1 
    ?
    (B extends 0 ? 1 : 0)
    :
    (B extends 1 ? 1 : 0); 

type XNOR<
    A extends 0 | 1,
    B extends 0 | 1
> = 
    NOT<XOR<A, B>>;
