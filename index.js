const h = require('http')
const fs = require('fs')
const seq = require('sequelize')
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
let error = ''
const s = new h.Server((req,res)=>{
	let data = ''
//-------------------------------data insertion with duplicate checking-------------------------
	if(req.method == 'POST'&&req.url=='/'){
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
//--------------------------------------------------------------------------------------------------

		
	}

	async function getProducts(){
		let p = await prod.findAll().then((d)=>{
							return [...d.map((p)=>{return p.dataValues})]
						})
		return p
	}

	if(req.url=='/getProducts'){
		
		async function getProd(){
			let p = await getProducts()
			res.writeHead(200,{"Content-Type": "text/plain"})
			res.end(JSON.stringify(p))
		}
		getProd()
	}
	if(req.url=='/update'){
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
	}
	if(req.url=='/image'){
		// req.pipe(
		//       fs.createWriteStream('file2.jpg')
		//     ).on('finish', () => res.end('ok'));
		let data
		req.on('data',(d)=>{
			data+=d
		})
		req.on('end',()=>{
			console.log(new Buffer(data.slice(31), "base64").toString("base64"))
			base64 = data.slice(31)
			let bitmap = new Buffer(base64, 'base64');
			// write buffer to file
			fs.writeFileSync("file2.jpg", bitmap);
			res.end("ok")

		})
		
	}
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
	if(req.url=='/vendor.js'){
		res.writeHead(200,{"Content-Type": "text/javascript"})
		res.end(fs.readFileSync('./app/vendor.bundle.js'))
	}


})
s.listen(3000,'127.0.0.1')
