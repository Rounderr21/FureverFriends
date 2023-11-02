const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["phone"],
      },
    ],
  }
);

User.associate = (models) => {
  User.hasMany(models.Pet, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
};

module.exports = User;
