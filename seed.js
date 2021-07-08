require('dotenv').config()

const mongoose = require('mongoose')

const User = require('./models/User');
const Order = require('./models/Order');

const users = [
    { userId: 1, name: 'Rahul'},
    { userId: 2, name: 'Ramesh'},
    { userId: 3, name: 'Ankita'},
]

const orders = [
    { orderId: 1, userId: 1, subTotal: 500, date:  '23 January 2019' },
    { orderId: 2, userId: 2, subTotal: 400, date:  '16 March 2019' },
    { orderId: 3, userId: 1, subTotal: 150, date:  '20 March 2019' },
    { orderId: 4, userId: 1, subTotal: 750, date:  '25 March 2019' },
    { orderId: 5, userId: 3, subTotal: 200, date:  '21 Feb 2019' },
    { orderId: 6, userId: 3, subTotal: 1500, date: '22 Feb 2019'  },
    { orderId: 7, userId: 1, subTotal: 1200, date: '16 April 2019'  },
    { orderId: 8, userId: 2, subTotal: 1600, date: '1 May 2019'  },
    { orderId: 9, userId: 2, subTotal: 900, date:  '23 May 2019' },
    { orderId: 10, userId: 1, subTotal: 700, date: '13 April 2019'  },
]

mongoose.connect(process.env.DATABASE_URL, async () => {

    console.log('connected')

    const result = await User.deleteMany()
    console.log(`Deleted user; ${result.deletedCount}`)


    const insertedUsers = await User.insertMany(users)
    console.log(`Inserted user`, insertedUsers)


    const deletedOrders = await Order.deleteMany()
    console.log(`Deleted order; ${deletedOrders.deletedCount}`)


    const insertedOrder = await Order.insertMany(orders)
    console.log(`Inserted Order`, insertedOrder)

})