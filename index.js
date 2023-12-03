const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const order = []
const checkUserId = (request, response, next) =>{
  const  {id} = request.params
  const index = order.findIndex(orden => orden.id === id)

  if(index < 0){ 
  
  return response.status(404).json({error:"Orden not found"})
  }
  request.userIndex = index
  request.userId = id
  next()

}
const miyFirstMiddleware = (request,response, next) =>{
const {method, url} = request.body
  console.log ("request URL:", request.originalUrl); 
  console.log("req Type:", request.method);
      next();
      
      }
      app.use(miyFirstMiddleware)



app.get("/order",(request,response) =>{
console.log("method, url")
  return response.json(order)

})


app.post("/order",(request,response) =>{
  console.log("method, url")
const {pedido,name,price} = request.body

const orden = {id:uuid.v4(), pedido:"x- salada batata grande 1 coca cola", clientName:"jose", price:44.50,status:"em preraçao",}
order.push(orden)

  return response.status(201).json(orden)
})


app.put("/order/:id",checkUserId, (request,response) =>{
console.log("method, url")
const {pedido, clientName, price} =  request.body
const index = request.ordenIndex
const id = request.ordenId

const updateOrden = { pedido, clientName, price}

order[index] = updateOrden

  return response.json(updateOrden)
 })


app.delete("/order/:id",checkUserId, (request, response) => {
console.log("method, url")
  const {id} = request.params

const index= order.findIndex(orden => orden.id === id)

if(index < 0){
  return response.status(404).json({message:"Orden not found"})

} 
order.splice(index,1)
return response.status(204).json()

})
app.get("/order/:id", (request, response) => {
 console.log("method, url")
 
  const {id} = request.params
const  {pedido,  clientName, price } = request.body

const orden = {id ,pedido: "x- salada 1 coca cola", clientName:"maria", price:33.40} 

  return response.json(orden)

})

app.patch("/order/:id",checkUserId, (request, response) =>{
  console.log("method, url")
    const  {id} = request.params
    const {pedido, clientName, price, status} =  request.body
    
    const pachOrder = { id, pedido, clientName, price,status}
    
    const index = order.findIndex(orden => orden.id === id)
    
    if(index < 0){ 
    
    return response.status(404).json({message:"Orden not found"})
    }
    
    order[index,1] = pachOrder
    
      return response.json(pachOrder)
     })
    



app.listen(port, () => {
  
console.log(`server started on port ${port}`)

})

