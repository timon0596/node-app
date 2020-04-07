const h = require('http')
const fs = require('fs')
const seq = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
	destination: "./imgs/",
	filename: function(req,file,cb){
		cb(null,file.fieldname + "-" + Date.now()+path.extname(file.originalname))
	}
})
// const upload = multer({
// 	storage: storage
// }).single("myimage")

const app = express()

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
const conn = new seq('pie_db','root','',
	{
		host: 'localhost', 
		dialect: 'mysql',
		
	})
const prod = conn.define('products',{
		name: {
			type: seq.STRING,
			unique: true,
			allowNull: false
		},
		composition: {
			type: seq.STRING
		},
		description: {
			type: seq.STRING
		},
	},
	{
		timestamps: false
	}
)

conn.sync()

app.use(express.static(__dirname));
app.use(multer({
	storage: storage
}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

app.post('/img', function (req, res) {
	upload(req,res,(er)=>{
		console.log(req.files)
		res.send("ok")
	})

})
app.get('/', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/html"})
	res.end(fs.readFileSync('./app/index.html'))
})
app.get('/getProducts', function (req, res) {
	async function getProducts(){
			let p = await prod.findAll().then((d)=>{
								return [...d.map((p)=>{return p.dataValues})]
							})
			return p
		}
	async function getProd(){
		let p = await getProducts()
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end(JSON.stringify(p))
	}
	getProd()
})
app.post('/update', function (req, res) {
	let data
			req.on('data',(d)=>{
				data=JSON.parse(d)
			})
			req.on('end',()=>{
				prod.update({name: data.name,composition: data.composition},{where: {id: data.id}}).then((d)=>{
					console.log(d)
					res.writeHead(200,{"Content-Type": "text/plain"})
					res.end("данные обновлены")
				}).catch((e)=>{
					console.log(e)
				})
			})
})
app.get('/vendor.js', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/javascript"})
	res.end(fs.readFileSync('./app/vendor.bundle.js'))
})
app.get('/all.css', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/css"})
	res.end(fs.readFileSync('./app/all.css'))
})
app.get('/bundle.js', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/javascript"})
	res.end(fs.readFileSync('./app/bundle.js'))
})
app.post('/', function (req, res) {
		req.on('data',(d)=>{
			data=d
		})

	req.on('end',()=>{
		
		data = JSON.parse(data)
		console.log(data)

		conn.query('SELECT * FROM products WHERE name = :name',
		{
			
			replacements: {name: data.name},
			type: seq.QueryTypes.SELECT

		}).then((d)=>{

			if(!(d.length>0) && !!data.name){

				conn.query('INSERT IGNORE INTO products (products.name, products.composition) VALUES (:name, :comp)',
				{
					replacements: {name: data.name, comp: data.composition},
					type: seq.QueryTypes.INSERT
				})
				
			}
		})
		
	})
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
let error = ''
// const s = new h.Server((req,res)=>{
// 	let data = ''
// //-------------------------------data insertion with duplicate checking-------------------------
// 	if(req.method == 'POST'&&req.url=='/'){
// 		req.on('data',(d)=>{
// 			data=d
// 		})

// 	req.on('end',()=>{
		
// 		data = JSON.parse(data)
// 		console.log(data)

// 		conn.query('SELECT * FROM products WHERE name = :name',
// 		{
			
// 			replacements: {name: data.name},
// 			type: seq.QueryTypes.SELECT

// 		}).then((d)=>{

// 			if(!(d.length>0) && !!data.name){

// 				conn.query('INSERT IGNORE INTO products (products.name, products.composition) VALUES (:name, :comp)',
// 				{
// 					replacements: {name: data.name, comp: data.composition},
// 					type: seq.QueryTypes.INSERT
// 				})
				
// 			}
// 		})
		
// 	})
// //--------------------------------------------------------------------------------------------------

		
// 	}

// 	async function getProducts(){
// 		let p = await prod.findAll().then((d)=>{
// 							return [...d.map((p)=>{return p.dataValues})]
// 						})
// 		return p
// 	}

// 	if(req.url=='/getProducts'){
		
// 		async function getProd(){
// 			let p = await getProducts()
// 			res.writeHead(200,{"Content-Type": "text/plain"})
// 			res.end(JSON.stringify(p))
// 		}
// 		getProd()
// 	}
	// if(req.url=='/update'){
	// 	let data
	// 	req.on('data',(d)=>{
	// 		data=JSON.parse(d)
	// 	})
	// 	req.on('end',()=>{
	// 		prod.update({name: data.name,composition: data.composition},{where: {id: data.id}}).then((d)=>{
	// 			console.log(d)
	// 			res.writeHead(200,{"Content-Type": "text/plain"})
	// 			res.end("данные обновлены")
	// 		}).catch((e)=>{
	// 			console.log(e)
	// 		})
	// 	})	
	// }
// 	if(req.url=='/image'){
// 		let data
// 		let imgData
// 		req.on('data',(d)=>{
// 			try {
// 			    imgData = JSON.parse(d);
// 			} catch (e) {
// 				data+=d
// 			    console.log("not JSON");
// 			}
			
// 		})
// 		req.on('end',()=>{
// 			if(data){
// 				base64 = data.slice(31)
// 				let bitmap = new Buffer(base64, 'base64');
// 				// write buffer to file
// 				fs.writeFileSync("imgs/file2.jpg", bitmap);
// 				res.end("ok")
// 			}
// 			else{
// 				console.log(imgData)
// 			}
			

// 		})
		
// 	}
// 	// if(req.url=='/img'){
		
// 	// 	req.on('data',(d)=>{
// 	// 		fs.writeFileSync("imgs/img.jpg", d, {"encoding": "base64"})

// 	// 	})
// 	// 	req.on('end',()=>{
			
// 	// 			res.end("1111111111111")
// 	// 	})
// 	// }
// 	if(req.url=='/'){
// 		res.writeHead(200,{"Content-Type": "text/html"})
// 		res.end(fs.readFileSync('./app/index.html'))
// 	}
// 	if(req.url=='/all.css'){
// 		res.writeHead(200,{"Content-Type": "text/css"})
// 		res.end(fs.readFileSync('./app/all.css'))
// 	}
// 	if(req.url=='/bundle.js'){
// 		res.writeHead(200,{"Content-Type": "text/javascript"})
// 		res.end(fs.readFileSync('./app/bundle.js'))
// 	}	
// 	if(req.url=='/vendor.js'){
// 		res.writeHead(200,{"Content-Type": "text/javascript"})
// 		res.end(fs.readFileSync('./app/vendor.bundle.js'))
// 	}


// })
// s.listen(3000,'127.0.0.1')
