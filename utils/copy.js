const fs = require('fs-extra');
const path = require('path');
const { logError, logStep } = require('./logger');

/**
 * Copy template files to target directory
 */
async function copyTemplate(template, language, targetPath, projectName, dryRun = false) {
    try {
        // Check if target directory already exists
        if (await fs.pathExists(targetPath)) {
            logError(`Directory "${projectName}" already exists!`);
            process.exit(1);
        }

        // Construct template path
        const templatePath = path.join(__dirname, '..', 'templates', template, language);

        // Check if template exists
        if (!(await fs.pathExists(templatePath))) {
            logError(`Template "${template}" with language "${language}" not found!`);
            process.exit(1);
        }

        if (dryRun) {
            logStep(`[DRY RUN] Would copy ${template} template (${language}) to ${targetPath}`);
            logStep(`[DRY RUN] Would update package.json with name "${projectName}"`);
            return;
        }

        // Copy template to target directory
        logStep(`Copying ${template} template (${language})...`);
        await fs.copy(templatePath, targetPath);

        // Update package.json with project name
        await updatePackageJson(targetPath, projectName);

        logStep('Template files copied successfully');
    } catch (error) {
        logError('Failed to copy template files');
        console.error(error);
        process.exit(1);
    }
}

/**
 * Update package.json with the actual project name
 */
async function updatePackageJson(targetPath, projectName) {
    const packageJsonPath = path.join(targetPath, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
}

module.exports = {
    copyTemplate
};
