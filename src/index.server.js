const express = require('express');
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const cors = require('cors');

// routes
const authRoutes = require('./routes/authRoute');
const adminRoutes  = require('./routes/admin/adminRoute');
const categoryRoutes = require('./routes/CategoryRoute');
const productRoutes = require('./routes/ProductRoute');
const cartRoutes = require('./routes/CartRoutes');
const initialDataRoutes = require('./routes/admin/initialDataRoute');
const pageRoutes = require('./routes/admin/pageRoute');
const addressRoutes = require('./routes/AddressRoute');
const orderRoutes = require('./routes/OrderRoute');
const orderAdminRoutes = require('./routes/admin/orderRoute');

env.config();

app.use(express.json());
app.use('/public/', express.static(path.join(__dirname,'uploads')));
app.use(cors());


//mongodb connection
//mongodb+srv://Olim:<password>@cluster0.f6um6qy.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
    'mongodb+srv://Olim:Olim19981004@cluster0.f6um6qy.mongodb.net/Ecommerce',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database connected')
})


app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderAdminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})
