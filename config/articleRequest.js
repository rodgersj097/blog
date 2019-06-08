var Request = require('request')
var CacheService = require('../config/cache.service')

const ttl = 60 * 60 * 1; 

const cache = new CacheService(ttl)



