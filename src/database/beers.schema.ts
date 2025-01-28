import { sequelize } from "./db";
import { DataTypes } from "sequelize";

export const Beer = sequelize.define('beers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cerveceria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origen: {
        type: DataTypes.STRING,
    },
    estilo: {
        type: DataTypes.STRING,
    },
    alcohol: {
        type: DataTypes.FLOAT,
    },
    premios: {
        type: DataTypes.STRING,
    },
    ibu: {
        type: DataTypes.INTEGER,
    }
});


