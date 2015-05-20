require.config {
    paths: {
        jquery: "./vendor/jquery/dist/jquery.min"
        codemirror: "./vendor/codemirror"
        firebase: "./vendor/firebase/firebase"
        av: "./module/av"
    }
    shim: {
        firebase: {
            exports: "Firebase"
        }
        av: {
            exports: "AV"
        }
    }
}