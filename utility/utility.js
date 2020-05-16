module.exports = {
	indexedArray(){
		return new Proxy(Array,{
			construct(target,[args]){
				const index = {}
				args.forEach((el)=>{
					index[el.id]=el
				})
				return new Proxy(new target(...args),{
					get(arr,prop){
						switch(prop){
							case "push": return item => {
								index[item.id]=item
								arr[prop](item)
							}
							case "where_id": return id => index[id]
							default: return arr[prop]
						}
					}
				})
			}
		})
	},
	Basket(obj){
		return new Proxy(obj,{
			set(target,prop,val){
				if(prop in target && val.amount==0){
					console.log(`${target[prop].name} has been deleted from basket`)
					delete target[prop]
					return true
				}
				target[prop]=val
				console.log(`${target[prop].name} has benn added to the basket`)
				return true
			},
			get(target,prop){
				if(prop==="length") return Object.keys(target).length
					return target[prop]
			}
		})
	}

}