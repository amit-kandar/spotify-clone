module.exports = (sequelize, DataTypes) => {
    
    const Song = sequelize.define("song", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releasedate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    })
    return Song
}
