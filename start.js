const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting RMK Engineering College Student Management System...');
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  cwd: process.cwd()
});
const client = spawn('npx', ['vite', '--port', '3000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: path.join(process.cwd(), 'client')
});
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  server.kill();
  client.kill();
  process.exit(0);
});
server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

client.on('close', (code) => {
  console.log(`Client process exited with code ${code}`);
});

console.log(' Both servers started successfully!');
console.log('🔗 Frontend: http://localhost:3000');
console.log('🔗 Backend API: http://localhost:5000/api');
