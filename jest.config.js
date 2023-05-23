module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
        "pageTitle": "Report",
        "outputPath": "./test/report/report.html"
        }]
     ]
};
