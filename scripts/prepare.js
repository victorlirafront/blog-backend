try {
  const husky = require('husky');
  if (typeof husky.install === 'function') {
    husky.install();
  } else if (
    typeof husky.default === 'function' &&
    typeof husky.default.install === 'function'
  ) {
    husky.default.install();
  }
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log('Husky not found, skipping installation (production build)');
    process.exit(0);
  }
  process.exit(0);
}
