"use strict";

import { Model } from "sequelize";

interface ItemAttributes {
    id: number;
    name: string;
    currentBid: number;
    description: string;
    starting_date: Date;
    finsih_date: Date;
    created_by: number;
    img: string;
    
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Item extends Model<ItemAttributes> implements ItemAttributes{
        id!: number;
        name!: string;
        currentBid!: number;
        description!: string;
        starting_date!: Date;
        finsih_date!: Date;
        created_by!: number;
        img!: string;

        static associate(models: any){
            Item.belongsTo(models.User, {foreignKey: "created_by", as: "creator"});
        }
        
    }

    Item.init({
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currentBid: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starting_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        finsih_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Item"
    })

    return Item;
}