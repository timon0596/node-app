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
		cb(null,String(file.originalname.match(/.+\./)).slice(0,-1) + "-" + Date.now()+path.extname(file.originalname))
	},
	filefilter(req,file,next){
		if(!!req.body.name&&file.mimetype.startsWith("image/")){
			next(null,true)
		}
		else{
			next()
		}
	}
})
const upload = multer({storage:storage});

const app = express()
app.use('/js1', express.static(__dirname+"/app/bundle.js"))
app.use('/js', express.static(__dirname+"/app/vendor.bundle.js"))
app.use('/all.css', express.static(__dirname+"/app/all.css"))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname));

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
		image: {
			type: seq.STRING
		},
	},
	{
		timestamps: false
	}
)
conn.sync()


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

app.post('/newProduct',upload.any(), function (req, res, next) {
		conn.query('SELECT * FROM products WHERE name = :name',
		{
			replacements: {name: req.body.name},
			type: seq.QueryTypes.SELECT

		}).then((d)=>{

			if(!(d.length>0) && !!req.body.name){

				conn.query('INSERT IGNORE INTO products (products.name, products.composition, products.image) VALUES (:name, :comp, :img)',
					{
						replacements: {name: req.body.name, comp: req.body.composition, img: req.files[0].filename},
						type: seq.QueryTypes.INSERT
					})
				res.end("ok")
				
			}
		})
		
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

console.log(path.resolve(__dirname,"imgs"))