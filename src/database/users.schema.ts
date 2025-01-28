import { DataTypes } from "sequelize";
import { sequelize } from "./db";

export const User = sequelize.define('users', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true

  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  role: {
      type: DataTypes.STRING,
      defaultValue: "user"
  }
});
  