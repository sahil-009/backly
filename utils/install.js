const { spawn } = require('child_process');
const ora = require('ora');
const { logError, logStep } = require('./logger');

/**
 * Install npm dependencies
 */
async function installDependencies(targetPath, dryRun = false) {
    return new Promise((resolve, reject) => {
        if (dryRun) {
            logStep('[DRY RUN] Would install dependencies');
            resolve();
            return;
        }

        logStep('Installing dependencies...');
        const spinner = ora('Running npm install...').start();

        const npmInstall = spawn('npm', ['install'], {
            cwd: targetPath,
            stdio: 'pipe',
            shell: true
        });

        npmInstall.on('close', (code) => {
            if (code === 0) {
                spinner.succeed('Dependencies installed successfully');
                resolve();
            } else {
                spinner.fail('Failed to install dependencies');
                logError('npm install exited with code ' + code);
                reject(new Error('npm install failed'));
            }
        });

        npmInstall.on('error', (error) => {
            spinner.fail('Failed to install dependencies');
            logError('Error running npm install');
            console.error(error);
            reject(error);
        });
    });
}

module.exports = {
    installDependencies
};
