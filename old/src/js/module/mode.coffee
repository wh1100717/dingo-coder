define (require, exports, module) ->
    "use strict"

    Mode = {
        js: {
            mode: "javascript"
            type: "text/js"
        }
        css: {
            mode: "css"
            type: "text/css"
        }
        html: {
            mode: "htmlmixed"
            type: "text/html"
        }
        velocity: {
            mode: "velocity"
            type: "text/velocity"
        }
        sass: {
            mode: "sass"
            type: "text/x-sass"
        }
    }


    module.exports = Mode