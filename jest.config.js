module.exports = {
    "collectCoverage": true,
    "collectCoverageFrom": [
        "**/src/**",
        // "**/node_modules/**"
    ],
    "verbose": true,
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
    "modulePathIgnorePatterns": ["test/utils", "db/test", "dist/"],
    "coveragePathIgnorePatterns": ["knex_migrations/","knex_seeds/", "src/server.ts"]
}