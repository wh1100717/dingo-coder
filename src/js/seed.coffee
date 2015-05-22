require.config {
    paths: {
        jquery: "./vendor/jquery/dist/jquery.min"
        codemirror: "./vendor/codemirror"
        firebase: "./vendor/firebase/firebase"
    }
    shim: {
        firebase: {
            exports: "Firebase"
        }
    }
}