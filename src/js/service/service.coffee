define (require, exports, module) ->
    "use strict"

    Firebase = require("firebase")
    UserService = require("./userService")

    class Service
        constructor: ->
            @fbRef = new Firebase("https://dingo-coder.firebaseio.com/")
            @userService = new UserService(@fbRef)
        getUserService: -> @userService

    module.exports = Service