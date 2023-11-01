//put pet up for adoption
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserPost extends Model {}

UserPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    user_name: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "name",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userpost",
  }
);

module.exports = User;
