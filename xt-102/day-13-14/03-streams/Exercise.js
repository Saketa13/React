const fs = require( 'fs' );

const rs = fs.createReadStream( './output.txt' );
const ws = fs.createWriteStream( './output-copy.txt' );

// 'data' event is emitted after 1 chunk of info is read
rs.on( 'data', function( chunk ) {
    // process.stdout.write()
    console.log( '*** data event has fired ***' );
    console.log( chunk.toString() );
    ws.write(chunk.toString());
    ws.write('Hello world 44\n');
// the contents may get buffered internally for efficiency

});
rs.on('end',function(){
    ws.end();
});
// start reading... (start sipping a straw - default is 16KB)
rs.read();

// The request object passed to http server callback function is a readable stream object