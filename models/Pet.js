const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "name",
      },
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
      references: {
        model: "user",
        key: "email",
      },
    },
    user_phone: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "phone",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "pet",
  }
);

Pet.associate = (models) => {
  Pet.belongsTo(models.User, {
    foreignKey: "user_id",
  });
};

module.exports = Pet;
