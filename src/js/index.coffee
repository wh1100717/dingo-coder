define (require, exports, module) ->
    "use strict"

    Element = require("./element")

    Service = require("./service/service")

    Index = {}

    Index.init = ->
        service = new Service()
        Element.init(service)

 
    module.exports = Index