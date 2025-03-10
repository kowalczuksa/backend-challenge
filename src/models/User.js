const { DataTypes } = require("sequelize"); 
const sequelize = require("../config/database"); 

//  Define the user model in the database
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID, // Unique ID
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // User's name
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, // Unique Email
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate that it is a valid email address
    },
  },
  password: {
    type: DataTypes.STRING, // Encrypted password
    allowNull: false,
  },
});

module.exports = User; //  Export the model for use in other parts of the code
