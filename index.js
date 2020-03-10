const h = require('http')
const fs = require('fs')
const seq = require('sequelize')
const conn = new seq('pie_db','root','',{host: 'localhost', dialect: 'mysql'})
conn.define('products',{
	name: {
		type: seq.STRING
	},
	composition: {
		type: seq.STRING
	},
	description: {
		type: seq.STRING
	},
})
conn.sync()
const s = new h.Server((req,res)=>{
	console.log(req.url)
	if(req.url=='/'){
		res.writeHead(200,{"Content-Type": "text/html"})
		res.end(fs.readFileSync('./app/index.html'))
	}
	if(req.url=='/all.css'){
		res.writeHead(200,{"Content-Type": "text/css"})
		res.end(fs.readFileSync('./app/all.css'))
	}
	if(req.url=='/bundle.js'){
		res.writeHead(200,{"Content-Type": "text/javascript"})
		res.end(fs.readFileSync('./app/bundle.js'))
	}


})
s.listen(3000,'127.0.0.1')
