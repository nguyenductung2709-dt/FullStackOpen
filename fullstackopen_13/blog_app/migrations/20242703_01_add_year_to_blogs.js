const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface}) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1991,
                max: 2024
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
      },
    }