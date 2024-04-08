const events = require('events')

const emiter = new events.EventEmitter();


emiter.on('hai',()=>{
    console.log('hai iam salman');
})

emiter.emit('hai');

console.log(events);