import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { createAccount, accountConfigured } from '../src/server/auth.mjs';
const rl = createInterface({ input: stdin, output: stdout });
if (accountConfigured()) {
  const answer = await rl.question('Akun sudah ada. Ganti password dan keluarkan semua sesi? Ketik YA: ');
  if (answer !== 'YA') { rl.close(); process.exit(0); }
}
const username = (await rl.question('Username admin: ')).trim();
rl.close();
async function secret(prompt) {
  if (!stdin.isTTY) throw new Error('Jalankan perintah ini dari terminal interaktif.');
  stdout.write(prompt); stdin.setRawMode(true); stdin.resume();
  return new Promise((resolve, reject) => {
    let value = '';
    const done = () => { stdin.off('data', onData); stdin.setRawMode(false); stdin.pause(); stdout.write('\n'); };
    function onData(chunk) {
      for (const char of chunk.toString('utf8')) {
        if (char === '\u0003') { done(); reject(new Error('Dibatalkan.')); return; }
        if (char === '\r' || char === '\n') { done(); resolve(value); return; }
        if (char === '\u007f' || char === '\b') { if (value.length) { value = value.slice(0, -1); stdout.write('\b \b'); } }
        else if (char >= ' ') { value += char; stdout.write('*'); }
      }
    }
    stdin.on('data', onData);
  });
}
try {
  const password = await secret('Password (minimal 12 karakter): ');
  const confirmation = await secret('Ulangi password: ');
  if (password !== confirmation) throw new Error('Password tidak sama.');
  createAccount(username, password);
  console.log('Akun admin siap. Buka /admin dan login.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
