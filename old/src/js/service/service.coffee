define (require, exports, module) ->
    "use strict"

    AuthService = require("./authService")
    UserService = require("./userService")

    Service = {}

    Service.authService = new AuthService()

    Service.userService = new UserService(Service)

    module.exports = Service