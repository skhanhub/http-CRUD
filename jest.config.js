module.exports = {
    roots: [
      "<rootDir>/tests"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true,
    coverageReporters: ["text-summary", "html"]
}