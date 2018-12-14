import fs from 'fs';
import childProcess from 'child_process';

export function edit(path) {
  const editor = process.env.EDITOR;

  if (!editor) {
    console.log('Please set EDITOR environment variable');
    return false;
  }

  try {
    childProcess.execSync(`${editor} ${path}`, { stdio: 'inherit' });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}

export function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data.trim());
    });
  });
}
