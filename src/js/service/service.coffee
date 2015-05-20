define (require, exports, module) ->
    "use strict"

    AuthService = require("./authService")

    class Service
        constructor: ->
            @authService = new AuthService(@fbRef)
        getUserService: -> @authService

    module.exports = Service