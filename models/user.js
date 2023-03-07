
module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      userId: {
        type: Number
      },
      userName: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      password: {
        type: String
      },
     
      email: {
        type: String
      },
      phone: {
        type: String
      },
      designation: {
        type: String
     }
     
    });
    return mongoose.model('user', userSchema);
  };