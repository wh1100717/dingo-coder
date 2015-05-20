define (require, exports, module) ->
    "use strict"

    Firebase = require("firebase")

    class AuthService

        constructor: ->
            # @authRef = new Firebase("https://dingo-coder.firebaseio.com/")
            @authRef = new Firebase("https://luminous-fire-9425.firebaseio.com/")

        getUser: -> @authRef.getAuth()

        register: (email, password, callback) ->
            @authRef.createUser {
                email: email
                password: password
            }, (error, userData) -> callback(error, userData) if callback?
            return

        login: (email, password, callback) ->
            authRef.authWithPassword {
                email: email
                password: password
            }, (error, authData) -> callback(error, authData) if callback?
            return
        logout: ->
            @authRef.unauth()
            return
        changeEmail: (oldEmail, newEmail, password, callback) ->
            @authRef.changeEmail {
                oldEmail: oldEmail
                newEmail: newEmail
                password: password
            }, (error) -> callback(error) if callback?
            return
        changePassword: (email, oldPassword, newPassword, callback) ->
            @authRef.changePassword {
                email: email
                oldPassword: oldPassword
                newPassword: newPassword
            }, (error) -> callback(error) if callback?
            return
        resetPassword: (email, callback) ->
            @authRef.resetPassword {
                email: email
            }, (error) -> callback(error) if callback?
            return

    module.exports = AuthService