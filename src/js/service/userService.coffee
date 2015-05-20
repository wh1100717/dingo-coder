define (require, exports, module) ->
    "use strict"

    Firebase = require("firebase")

    class UserService

        constructor: (@fbRef) ->

        getUser: -> @fbRef.getAuth()

        register: (email, password, callback) ->
            @fbRef.createUser {
                email: email
                password: password
            }, (error, userData) -> callback(error, userData) if callback?
            return

        login: (email, password, callback) ->
            fbRef.authWithPassword {
                email: email
                password: password
            }, (error, authData) -> callback(error, authData) if callback?
            return
        logout: ->
            @fbRef.unauth()
            return
        changeEmail: (oldEmail, newEmail, password, callback) ->
            @fbRef.changeEmail {
                oldEmail: oldEmail
                newEmail: newEmail
                password: password
            }, (error) -> callback(error) if callback?
            return
        changePassword: (email, oldPassword, newPassword, callback) ->
            @fbRef.changePassword {
                email: email
                oldPassword: oldPassword
                newPassword: newPassword
            }, (error) -> callback(error) if callback?
            return
        resetPassword: (email, callback) ->
            @fbRef.resetPassword {
                email: email
            }, (error) -> callback(error) if callback?
            return

    module.exports = UserService