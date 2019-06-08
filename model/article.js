const Sequelsize = require("sequelize")
const db = require('../config/DBConnect')
const multer = require('multer')


const Article = db.define('article', { 
    artImg:{ 
        type : Sequelsize.STRING
    } ,
    articleTitle:{ 
        type : Sequelsize.STRING
    } ,
    articleDecs:{ 
        type : Sequelsize.STRING
    } ,
    article:{ 
        type : Sequelsize.STRING
    } ,
    authImg:{ 
        type : Sequelsize.STRING
    } ,
    authName:{ 
        type : Sequelsize.STRING
    } ,
    date:{ 
        type : Sequelsize.DATE
    } ,
})

module.exports = Article

