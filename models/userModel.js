const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    }
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 2,
    max: 64
  },
  role: {
    type: String,
    enum:['admin','worker','client'],
    required: true
  }

},
  {
   timestamps:false
  })

usersSchema.pre('save', function hashPassword(next) {
  console.log("MIDDLEWARE HOOK FOR", this);
  if (!this.isModified('password')){
    return next()
  }

  bcrypt.hash(this.password, 12, (err, hashedPassword) => {
    console.log("Password hashed");
    if (err)
      return next(err)
    this.password = hashedPassword
    next()
  })
})

usersSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, (err, isMatched) => {
    if (err)
      return next(err,false)
    else {
      if (!isMatched) {
        return next(null, isMatched)
      }else{
        return next(null, this)
      }
    }
  })
}

const User = mongoose.model('User', usersSchema)

module.exports = {User}
