import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { config } from '../../config/env';

dotenv.config();
export const sequelize : Sequelize = new Sequelize(config.MYSQL_DATABASE,config.MYSQL_USER,'',{
    host: config.MYSQL_HOST,
    dialect: 'mysql'
})
export const syncDatabaseMysql = async () =>{
    try {
        await sequelize.sync({ alter: true })
        console.error('DataBase Mysql Synchronised Successfully ');
    } catch (error) {
        console.error('Error of Synchronization DataBase Mysql:',error)
        throw error
    }
}