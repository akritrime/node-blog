module.exports = {
    "collectCoverage": true,
    "collectCoverageFrom": [
        "**/src/**",
        "**/node_modules/**"
    ],
    "testEnvironment": "node",
    "moduleFileExtensions": [
        "js",
        "ts",
        "json",
        "node"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "(/test/.*|(\\.|/)(test|spec))\\.(js|ts)$",
    "modulePathIgnorePatterns": ["test/utils"]
}