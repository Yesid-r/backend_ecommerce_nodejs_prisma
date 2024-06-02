import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import productRoute from './routes/product.js'
import colorRoute from './routes/color.js'
import sizeRoute from './routes/size.js'
import categoryRoute from './routes/category.js'
import subCategoryRoute from './routes/sub_category.js'
import userRoute from './routes/user.js'
import orderRoute from './routes/order.js'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

const corsOptions = {
    origin:true,
    credentials: true
}

const port = process.env.PORT ||8000
app.use(express.json())
//llapp.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

app.use('/api/products', productRoute)
app.use('/api/color', colorRoute)
app.use('/api/size', sizeRoute)
app.use('/api/category', categoryRoute)
app.use('/api/sub_category', subCategoryRoute)
app.use('/api/user', userRoute)
app.use('/api/order', orderRoute)
app.use('/api/auth', authRoute)

app.listen(port, ()=> {
    console.log(`server listen on port: ${port}`)
})