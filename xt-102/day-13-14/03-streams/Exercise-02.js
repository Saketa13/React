const http = require( 'http' );
const fs = require( 'fs' );

// const src = fs.createReadStream( './output.txt' );
// const dest = fs.createWriteStream( './output-2-copy.txt' );
const server = http.createServer(function( req, res ) {
    const rs = fs.createReadStream( './output.txt' )
    const ws = fs.createWriteStream(req.url);
    rs.on( 'data', function( chunk ) {
        // process.stdout.write()
        console.log( '*** data event has fired ***' );
        console.log( chunk );
        ws.write(chunk);
    });

    rs.read();

    console.log( req.url );
    // res.write(res.pipe(dest));
    // res.end();
});

server.listen( 8080 );

console.log( 'end of script' );