require.config {
    paths: {
        codemirror: "./vendor/codemirror"
        firebase: "./vendor/firebase/firebase"
    }
    shim: {
        firebase: {
            exports: "Firebase"
        }
    }
}