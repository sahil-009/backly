const inquirer = require('inquirer');
const chalk = require('chalk');
const { logHeader, logSuccess, logStep } = require('./logger');
const { copyTemplate } = require('./copy');
const { installDependencies } = require('./install');
const path = require('path');

/**
 * Main CLI flow
 */
async function runCLI() {
    // Display welcome message
    console.log('');
    console.log(chalk.bold.blue('🚀 Welcome to ') + chalk.bold.magenta('APIcraft') + chalk.bold.blue(' - Backend Starter Generator'));
    console.log(chalk.gray('   Build production-ready APIs in seconds'));
    console.log('');

    // Check for command-line flags
    const args = process.argv.slice(2);
    const flags = parseFlags(args);

    // Step 1: Choose language
    const language = flags.language || await promptLanguage();

    // Step 2: Choose template
    const template = flags.template || await promptTemplate(language);

    // Step 3: Enter project name
    const projectName = flags.projectName || await promptProjectName();

    // Step 4: Generate project
    logStep('Generating project...');
    const targetPath = path.join(process.cwd(), projectName);

    await copyTemplate(template, language, targetPath, projectName, flags.dryRun);

    // Step 5: Install dependencies (unless --no-install flag is present)
    if (!flags.noInstall) {
        await installDependencies(targetPath, flags.dryRun);
    }

    // Step 6: Show success message and next steps
    console.log('');
    logSuccess('Project created successfully!');
    console.log('');
    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    if (flags.noInstall) {
        console.log('  npm install');
    }
    console.log('  npm run dev');
    console.log('');
}

/**
 * Parse command-line flags
 */
function parseFlags(args) {
    const flags = {
        language: null,
        template: null,
        projectName: null,
        noInstall: false,
        dryRun: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--ts') {
            flags.language = 'ts';
        } else if (arg === '--js') {
            flags.language = 'js';
        } else if (arg === '--template' && args[i + 1]) {
            flags.template = args[i + 1];
            i++;
        } else if (arg === '--name' && args[i + 1]) {
            flags.projectName = args[i + 1];
            i++;
        } else if (arg === '--no-install') {
            flags.noInstall = true;
        } else if (arg === '--dry-run') {
            flags.dryRun = true;
        }
    }

    return flags;
}

/**
 * Prompt for language selection
 */
async function promptLanguage() {
    const { language } = await inquirer.prompt([
        {
            type: 'list',
            name: 'language',
            message: chalk.cyan('? Choose language:'),
            choices: [
                { name: chalk.yellow('JavaScript (default)'), value: 'js' },
                { name: chalk.blue('TypeScript'), value: 'ts' }
            ],
            default: 'js'
        }
    ]);
    return language;
}

/**
 * Prompt for template selection
 */
/**
 * Prompt for template selection
 */
async function promptTemplate(language) {
    let choices = [
        { name: chalk.green('core') + '     - Minimal Express server + basic routes', value: 'core' },
        { name: chalk.cyan('base') + '     - Auth, DB, JWT, bcrypt, MVC structure', value: 'base' },
        { name: chalk.magenta('prime') + '    - Advanced architecture with services, RBAC', value: 'prime' },
        { name: chalk.yellow('commerce') + ' - E-Commerce backend (products, cart, orders)', value: 'commerce' },
        { name: chalk.blue('content') + '  - Blog/CMS starter (posts, comments)', value: 'content' },
        { name: chalk.red('social') + '   - Social backend (posts, likes, followers)', value: 'social' }
    ];

    // Filter choices for TypeScript (only core, base, prime are available)
    // if (language === 'ts') {
    //     choices = choices.filter(c => ['core', 'base', 'prime'].includes(c.value));
    // }

    const { template } = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template:',
            choices: choices,
            default: 'core'
        }
    ]);
    return template;
}

/**
 * Prompt for project name
 */
async function promptProjectName() {
    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: 'my-api',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Project name cannot be empty';
                }
                if (!/^[a-z0-9-_]+$/i.test(input)) {
                    return 'Project name can only contain letters, numbers, hyphens, and underscores';
                }
                return true;
            }
        }
    ]);
    return projectName;
}

module.exports = {
    runCLI,
    parseFlags
};
