const { User } = require('../models/userModel')

// const json = require('./user.json')
// console.log(json);
const createUsers = async () =>{

        const newUsers =  await  User.insertMany([
            {
                "name": "admin",
                "address": {
                        "street": "tokivägen",
                        "city": "stockholm",
                        "zip": "123"
                } ,
                "email": "admin@gmail.com",
                "password": "123",
                "role":  "admin"
            },
            {
                "name": "worker",
                "address": {
                        "street": "tokivägen",
                        "city": "stockholm",
                        "zip": "123"
                } ,
                "email": "worker@gmail.com",
                "password": "123",
                "role":  "worker"
            },
            {
                "name": "client",
                "address": {
                        "street": "tokivägen",
                        "city": "stockholm",
                        "zip": "123"
                } ,
                "email": "client@gmail.com",
                "password": "123",
                "role":  "client"
            }
        ])
        console.log(newUsers);
        await newUsers.save()

}
// const createUsers =  () =>{
//     json.forEach( async ( user ) => {
//         const newUsers =  await  User.insertMany({user})
//         console.log(newUsers);
//         // await newUsers.save()
//     })
// }
createUsers()



