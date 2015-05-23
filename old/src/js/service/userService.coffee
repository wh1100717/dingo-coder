define (require, exports, module) ->
    "use strict"

    Firebase = require("firebase")

    class UserService
        ###
         *  UserService负责记录用户的各种信息
         *  getUser:        获取当前用户对象
         *  update:         更新用户信息
         *  set:            设置用户信息
         *  push:           数组类型可以push一个item进去
         *  remove:         删除用户的某项信息
         *  destroy:        伤处用户全部信息
        ###
        constructor: (@service) ->
            @user = @service.authService.getUser()
            @userRef = new Firebase("https://dingo-coder.firebaseio.com/users/#{@user?.uid}")

        getUser: -> @user

        update: (options, callback) ->
            ### 批量更新接口
             *  @param options  {Object}, key为要更新项，value为具体的更新的值
            ###
            @userRef.update options, (error) -> callback(error)

        set: (userInfo, callback) ->
            ###
             *  @param userInfo {Object} 与更新操作不同，其会直接覆盖式操作，慎用。
            ###
            @userRef.set userInfo, (error) -> callback(error)

        push: (key, item, callback) ->
            ###
             *  @param key      {String}    User下的值为List类型的具体项的key，比如所hobby,可以按照如下格式来写："plan/q1/m1"表示当前用户的plan下面Q1季度下面第一个月的具体计划。
             *  @param item     {ANY}       数据中要Push的具体值。
            ###
            @userRef.child(key).push item, (error) -> callback(error)

        remove: (key, callback) ->
            @userRef.child(key).set null, (error) -> callback(error)

        destroy: (callback) ->
            @userRef.set null, (error) -> callback(error)

    module.exports = UserService