{
    // extend your base config to share compilerOptions, etc
    "extends": "./tsconfig.json",
    "compilerOptions": {
        // ensure that nobody can accidentally use this config for a build
        "noEmit": true
    },
    "include": [
        // whatever paths you intend to lint
        "src/**/*.ts"
    ]
}