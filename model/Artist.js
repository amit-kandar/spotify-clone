module.exports = (sequelize, DataTypes) => {
    
    const Artist = sequelize.define("artist", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    })
    return Artist
}
