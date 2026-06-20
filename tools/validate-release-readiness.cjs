const path = require('node:path');
const { validateReleaseReadiness } = require('./releaseReadiness.cjs');

function main() {
  const rootDir = path.resolve(__dirname, '..');
  const result = validateReleaseReadiness(rootDir);

  if (!result.ok) {
    console.error('RELEASE READINESS VALIDATION FAILED');
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify(result.summary, null, 2));
}

if (require.main === module) {
  main();
}
