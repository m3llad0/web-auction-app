"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    wallet?: number;
}

module.exports = (sequelize: Sequelize) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        id!: number;
        name!: string;
        lastname!: string;
        email!: string;
        password!: string;
        role!: string;
        wallet!: number;
        createdAt!: Date;

        static associate(models: any) {
            User.hasMany(models.Item, { foreignKey: "created_by", as: "items" });
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wallet: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false, // Disable updatedAt
    });

    return User;
};