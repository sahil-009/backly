import { readFileSync } from 'fs';
import { join } from 'path';

interface ServerInfo {
    dbConnected: boolean;
    startTime: Date;
}

const serverInfo: ServerInfo = {
    dbConnected: false,
    startTime: new Date()
};

export const setDbStatus = (connected: boolean): void => {
    serverInfo.dbConnected = connected;
};

export const getUptime = (): string => {
    const uptime = Date.now() - serverInfo.startTime.getTime();
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
};

const getVersion = (): string => {
    try {
        const packageJson = JSON.parse(
            readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
        );
        return packageJson.version || '1.0.0';
    } catch {
        return '1.0.0';
    }
};

const getNodeVersion = (): string => {
    return process.version;
};

export const displayBanner = (port: number | string, endpoints: string[]): void => {
    const version = getVersion();
    const nodeVersion = getNodeVersion();
    const dbStatus = serverInfo.dbConnected ? '✓' : '✗';
    const dbColor = serverInfo.dbConnected ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    const bold = '\x1b[1m';
    const cyan = '\x1b[36m';

    console.log('\n' + bold + cyan + '⚡ BACKLY PRIME API STARTED!' + reset);
    console.log('\n===============================================');
    console.log(` ${bold}Version:${reset}    ${version}`);
    console.log(` ${bold}Mode:${reset}       ${process.env.NODE_ENV || 'development'}`);
    console.log(` ${bold}Node:${reset}       ${nodeVersion}`);
    console.log(` ${bold}Database:${reset}   ${dbColor}${dbStatus}${reset} ${serverInfo.dbConnected ? 'Connected' : 'Not Connected'}`);
    console.log(` ${bold}Repo:${reset}       https://github.com/sahil-009/backly`);
    console.log('===============================================\n');

    if (endpoints.length > 0) {
        console.log('Available Endpoints:');
        endpoints.forEach(endpoint => {
            console.log(` • ${endpoint}`);
        });
        console.log('');
    }

    console.log(`⚡ Server running at ${bold}http://localhost:${port}${reset}`);
    console.log('===============================================\n');
};

// Display uptime every 60 seconds
setInterval(() => {
    const uptime = getUptime();
    process.stdout.write(`\r${'\x1b[2K'}Uptime: ${uptime}`);
}, 60000);
