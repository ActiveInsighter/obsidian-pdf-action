import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = process.cwd();
const logPath = path.resolve(projectRoot, '.github/latest-build-log.txt');

await fsp.mkdir(path.dirname(logPath), { recursive: true });

const logStream = fs.createWriteStream(logPath, { flags: 'w' });

function write(chunk) {
  process.stdout.write(chunk);
  logStream.write(chunk);
}

function writeErr(chunk) {
  process.stderr.write(chunk);
  logStream.write(chunk);
}

write(`# Build log\n`);
write(`started_at=${new Date().toISOString()}\n`);
write(`command=node scripts/build-pdf.mjs notes.md dist/notes.pdf\n\n`);

const child = spawn(process.execPath, ['scripts/build-pdf.mjs', 'notes.md', 'dist/notes.pdf'], {
  cwd: projectRoot,
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe']
});

child.stdout.on('data', write);
child.stderr.on('data', writeErr);

const exitCode = await new Promise((resolve) => {
  child.on('close', resolve);
});

write(`\nfinished_at=${new Date().toISOString()}\n`);
write(`exit_code=${exitCode}\n`);

await new Promise((resolve) => logStream.end(resolve));
process.exit(exitCode ?? 1);
