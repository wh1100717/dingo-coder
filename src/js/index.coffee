define (require, exports, module) ->
    "use strict"

    Element = require("./element")

    Index = {}

    Index.init = ->
        Element.init()

 
    module.exports = Index