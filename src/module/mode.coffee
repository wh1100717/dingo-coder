define (require, exports, module) ->
    "use strict"

    Mode = {
        js: "javascript"
        javascript: "javascript"
        html: "htmlmixed"
        css: "css"
        velocity: "velocity"
    }

    module.exports = Mode