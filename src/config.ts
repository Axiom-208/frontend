const apiConfig = {
    apiUrl: "https://axiom-backend-585462847531.europe-west2.run.app",
    // apiUrl: "http://localhost:8000",
    timeout: 10000,
}

const appConfig = {
    appName: "axiom",
    mode: "development",
}

const config = {
    api: apiConfig,
    app: appConfig,
}

export default config