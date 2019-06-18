const axios = require('axios')

exports.getAllArticles = routePath => async (req,res,next) => { 
    await axios({
        url: "http://localhost:1337/graphql", 
        method: "POST", 
        data: { 
            query: ` query articles{ 
                url
                articleTitle 
                articleDescription 
                author { 
                    authorName 
                    authorImage{ 
                        url 
                    }

                }
                Date 
            }
                `
        }.then((result)=>{ 
            res.render(routePath, result)
        })
        .catch((e)=>{ 
            console.log(`There was an error fetching articles ${e}`)
        })
    })
}

exports.getArticleById = async (req,res,next) => { 
    const id = req.params.id
    axios({
        url: "http://localhost:1337/graphql", 
        method: "POST", 
        data: { 
            query: `query articles(id: '${id}') { 
                url 
                metaDescription 
                metaKeywords
                articleTitle
                articleContent
                articleHeroImage{ 
                    url 
                }
            }`
        }
    })
}