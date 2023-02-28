module.exports = (mongodb) => {
    const userSchema = mongodb.Schema({
      userId: {
        type: Number
      },
      username: {
        type: String
      },
      firstname: {
        type: String
      },
      lastname: {
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
    return mongodb.model('user', userSchema);
  };