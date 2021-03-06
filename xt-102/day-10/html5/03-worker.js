function nthfibonacci( n ) {
    if( n == 1 ) {
        return 0;
    }

    if( n === 2 ) {
        return 1;
    }

    return nthfibonacci( n - 1 ) + nthfibonacci( n - 2 );
}

onmessage = function( { data: { n } } ) {
    console.log( 'Received : ', n, '. Now starting to compute...' );

    const result = nthfibonacci( n );

    postMessage({
        n,
        result
    });
};