#!/usr/bin/env node

const { runCLI } = require('./utils/prompt');
const { logSuccess, logError } = require('./utils/logger');

async function main() {


    try {
        console.log(''); // Add spacing
        await runCLI();
    } catch (error) {
        logError('An unexpected error occurred:');
        console.error(error);
        process.exit(1);
    }
}

main();
