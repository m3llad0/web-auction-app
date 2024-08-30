"use strict";
import { Module } from "module";
import { Model } from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        id!: number;
        name!: string;
        lastname!: string;
        email!: string;
        password!: string;
        role!: string;
        createdAt!: Date;

        static associate(models: any) {
            User.hasMany(models.Item, {foreignKey: "created_by", as: "items"});
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
    });

    return User;
};