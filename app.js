require('dotenv').config()

const mongoose = require('mongoose');

const User = require('./models/User');
const Order = require('./models/Order');

const app = require('express')()


mongoose.connect(process.env.DATABASE_URL, () => console.log('Connected'))


async function summary(){
    const result = await User.aggregate([
        {
            $lookup: {
                from: Order.collection.collectionName,
                localField: 'userId',
                foreignField: 'userId',
                as: 'orders'
            }
        }
    ])

    const newRes = result.map(user => {

        user.noOfOrders = user.orders.length

        const sum = user.orders.reduce((acc, order) => acc + order.subTotal, 0)

        user.averageBillValue = sum / user.noOfOrders

        delete user.orders

        return user

    })

    return newRes
}

app.get('/summary', async (req, res) => {

    const response = await summary()
    return res.json(response)

})


app.get('/update', async (req, res) => {

    const orderSummary = await summary()

    // orderSummary.forEach(async (userOrder) => {

    //     await User.findOneAndUpdate({userId: userOrder.userId}, {noOfOrders: userOrder.noOfOrders})

    // })


    const operations = orderSummary.map(userSummary => {
        return {
            updateOne: {
                filter: { userId: userSummary.userId},
                update: {
                    $set: {
                        noOfOrders: userSummary.noOfOrders
                    }
                }
            }
        }
    })

    const bulkOperationResult = await User.bulkWrite(operations)

    if (bulkOperationResult.nModified === operations.length) {
        return res.json({success: true, message : "Successfully updated"})
    }
    
    return res.json(bulkOperationResult)

})


app.listen(3000, () => console.log('Started'))
