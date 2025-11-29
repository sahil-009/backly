const { parseFlags } = require('../utils/prompt');

describe('CLI Flag Parsing', () => {
    it('should parse language flags correctly', () => {
        expect(parseFlags(['--ts'])).toEqual(expect.objectContaining({ language: 'ts' }));
        expect(parseFlags(['--js'])).toEqual(expect.objectContaining({ language: 'js' }));
    });

    it('should parse template flag correctly', () => {
        expect(parseFlags(['--template', 'commerce'])).toEqual(expect.objectContaining({ template: 'commerce' }));
    });

    it('should parse project name flag correctly', () => {
        expect(parseFlags(['--name', 'my-app'])).toEqual(expect.objectContaining({ projectName: 'my-app' }));
    });

    it('should parse no-install flag correctly', () => {
        expect(parseFlags(['--no-install'])).toEqual(expect.objectContaining({ noInstall: true }));
    });

    it('should parse dry-run flag correctly', () => {
        expect(parseFlags(['--dry-run'])).toEqual(expect.objectContaining({ dryRun: true }));
    });

    it('should handle mixed flags', () => {
        const args = ['--ts', '--template', 'social', '--name', 'social-app', '--dry-run'];
        const flags = parseFlags(args);
        expect(flags).toEqual({
            language: 'ts',
            template: 'social',
            projectName: 'social-app',
            noInstall: false,
            dryRun: true
        });
    });
});
