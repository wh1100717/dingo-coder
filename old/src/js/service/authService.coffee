define (require, exports, module) ->
    "use strict"

    Firebase = require("firebase")

    class AuthService
        ###
         *  AuthService用来处理用户的权限等内容。
         *  getUser:        获取当前用户对象
         *  register:       注册新用户
         *  login:          用户登陆
         *  logout:         用户登出
         *  changeEmail:    修改邮箱
         *  changePassword: 修改密码
         *  resetPassword:  重置密码(会给邮箱发重置密码的邮件)
        ###
        constructor: ->
            @authRef = new Firebase("https://dingo-coder.firebaseio.com/")

        getUser: -> @authRef.getAuth()

        register: (email, password, callback) ->
            @authRef.createUser {
                email: email
                password: password
            }, (error, userData) -> callback(error, userData) if callback?
            return

        login: (email, password, callback) ->
            @authRef.authWithPassword {
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