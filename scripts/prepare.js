try {
  require('husky').install();
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log('Husky not found, skipping installation (production build)');
    process.exit(0);
  }
  throw error;
}
