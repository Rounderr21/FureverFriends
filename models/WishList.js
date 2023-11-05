// user wishlist for pets to adopt
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WishList extends Model {}

WishList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pet",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "WishList",
  }
);

module.exports = WishList;
