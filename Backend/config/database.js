const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced successfully (alter:true)');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  testConnection,
};
