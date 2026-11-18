import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
const results = [];
for (const [command, args] of [
  ['sw_vers', []], ['uname', ['-m']], ['node', ['--version']], ['npm', ['--version']],
  ['xcode-select', ['-p']], ['xcodebuild', ['-version']], ['xcrun', ['simctl', 'list', 'devices']],
  ['adb', ['devices']], ['emulator', ['-list-avds']], ['java', ['-version']],
  ['lsof', ['-nP', '-iTCP:8081', '-sTCP:LISTEN']],
]) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  results.push({ command: [command, ...args].join(' '), status: result.status, error: result.error?.message,
    stdout: result.stdout, stderr: result.stderr });
}
const paths = ['/Applications/Xcode.app', '/Users/jaegeunsong/Library/Android/sdk', '/opt/homebrew/share/android-sdk'];
writeFileSync('TODO/evidence/goal12/platforms.json', JSON.stringify({ date: new Date().toISOString(), results,
  paths: paths.map(path => ({ path, exists: existsSync(path) })),
  nativeIos: '미검증: Xcode·simctl 없음', nativeAndroid: '미검증: SDK·adb·emulator 없음', committed: false }, null, 2));
console.log('플랫폼 환경 기록 완료');
