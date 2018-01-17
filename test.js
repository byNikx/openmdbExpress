let nconf = require('nconf');
nconf.env().file({
	file: './environments/environments.json'
});
let a=nconf.get('a');
console.log("a", a);
console.log('foo: ' + nconf.get('foo'));
console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));