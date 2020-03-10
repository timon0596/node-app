const h = require('http')
const fs = require('fs')
const mysql = require('mysql')
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

const s = new h.Server((req,res)=>{
	let html = fs.readFileSync('./dist/index.html')
	if(req.url=='/'){
		let reqBody=''
	res.setHeader('Content-Type', 'text/html');
		if(req.method=='POST'){
			req.on('data',data => {reqBody += data
				console.log(data + '\n')
			})
			req.on('end', data => {
				console.log(Object.keys(JSON.parse(reqBody)))
			})
		}
		res.end(html)

	}
	if(req.url=='/all.css'){
		res.setHeader('Content-Type', 'text/css');
		res.end(fs.readFileSync('./dist/all.css'))
	}
	if(req.url=='/all.js'){
		res.setHeader('Content-Type', 'text/javascript');
		res.end(fs.readFileSync('./dist/all.js'))
	}
	if(req.url=='/bundle.js'){
		res.setHeader('Content-Type', 'text/javascript');
		res.end(fs.readFileSync('./dist/bundle.js'))
	}
})
s.listen(3000,'127.0.0.1')
