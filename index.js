h = require('http')
s = new h.Server()
s.listen(3000,'127.0.0.1')
s.on('request',(req,res)=>{
	res.end('assssssssssss')
})