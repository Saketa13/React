// filesystem - reading / writing files/folders
const fs = require( 'fs' );

// non-blocking (will not prevent the next loine from executing)
// asynchronous (operation can complete anytime)
let content;
let buffer1;

fs.readFile( 'hello-world.txt', function( error, contents ) {
    if( error ) {
        console.error( error.message );
        return;
    }

    // Buffer toString() converts buffer to utf-8 string by default
     content = contents.toString( 'utf-8' ) ; // the argument is not necessary
     buffer1 = Buffer.from( content );
     fs.writeFile( 'hello-world-copy.txt', buffer1, { encoding: 'utf-8' }, function( error ) {
        if( error ) {
            console.error( 'There was an eror writing to the file' );
            return;
        }
        
        console.log( 'file has been written' );
    });
    //console.log( 'end of script' );
});

console.log(content);


