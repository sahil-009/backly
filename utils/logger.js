const chalk = require('chalk');

/**
 * Log success message in green
 */
/**
 * Log success message in green
 */
function logSuccess(message) {
    console.log(chalk.green.bold('✔ SUCCESS:'), chalk.green(message));
}

/**
 * Log error message in red
 */
function logError(message) {
    console.log(chalk.red.bold('✖ ERROR:'), chalk.red(message));
}

/**
 * Log warning message in yellow
 */
function logWarning(message) {
    console.log(chalk.yellow.bold('⚠ WARNING:'), chalk.yellow(message));
}

/**
 * Log info message in blue
 */
function logInfo(message) {
    console.log(chalk.blue.bold('ℹ INFO:'), chalk.blue(message));
}

/**
 * Log header with styling
 */
function logHeader(message) {
    console.log(chalk.bold.cyan(message));
}

/**
 * Log step message
 */
function logStep(message) {
    console.log(chalk.magenta('→'), chalk.white(message));
}

module.exports = {
    logSuccess,
    logError,
    logWarning,
    logInfo,
    logHeader,
    logStep
};
