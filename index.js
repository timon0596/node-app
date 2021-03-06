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
		cb(null,String(file.originalname.match(/.+\./)).slice(0,-1)+path.extname(file.originalname))
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
// app.use(express.static(__dirname+"/app/admin.bundle.js"))
app.use(express.static(__dirname+"/app/client.bundle.js"))
app.use('/js', express.static(__dirname+"/app/vendor.bundle.js"))
app.use('/all.css', express.static(__dirname+"/app/all.css"))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname));

const conn = new seq('id13730034_db1','id13730034_user1','Vuejstestpassword270596',
	{
		host: 'https://databases.000webhost.com/', 
		dialect: 'mysql',
		
	})

//-----------------------
//-----------------------
//-----------------------deleting excess imgs
//-----------------------
//-----------------------
conn.query("SELECT image FROM products").then((d)=>{
	d=d[0]
	d=d.filter((e)=>{return e.image!==null})
	d=d.map((e)=>{
		return e.image
	})
	
	fs.readdirSync(__dirname+"/imgs").forEach((el,i,ar)=>{
		if(d.indexOf(el)==-1){fs.unlinkSync(__dirname+"/imgs/"+el)}
	})
})
//-----------------------
//-----------------------
//-----------------------
//-----------------------
//-----------------------

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
	res.end(fs.readFileSync('./app/client/client.html'))
})
// app.get('/admin', function (req, res) {
// 	res.writeHead(200,{"Content-Type": "text/html"})
// 	res.end(fs.readFileSync('./app/index.html'))
// })
app.post('/img',(req,res)=>{
	let data=""
	req.on('data',(d)=>{
		data+=d
	})
	req.on('end',()=>{
		data = data.split(":")
		let img = Buffer(data[2],"base64")
		fs.writeFileSync("imgs/"+data[1],img)
		prod.update({image: data[1]},{where: {id: data[0]}}).then((d)=>{
				console.log(d)
				res.writeHead(200,{"Content-Type": "text/plain"})
				res.end("данные обновлены")
			}).catch((e)=>{
				console.log(e)
			})
	})
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
	console.log(req.body)
	data=req.body
			prod.update({name: data.name,composition: data.composition},{where: {id: data.id}}).then((d)=>{
					console.log(d)
					res.writeHead(200,{"Content-Type": "text/plain"})
					res.end("данные обновлены")
				}).catch((e)=>{
					console.log(e)
				})
})

app.post('/deletePost',function(req,res){
	let id = parseInt(req.body.id)
	prod.destroy({
      where: {
        id: parseInt(req.body.id),
      }
    })
    .then((d)=>{
    	res.end(JSON.stringify(d))
    })
    .catch((er)=>{
    	res.end(er.toString())
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
						replacements: {name: req.body.name, comp: req.body.composition, img: req.files[0]?req.files[0].filename:null},
						type: seq.QueryTypes.INSERT
					})
				res.end("ok")
				
			}
		})

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

