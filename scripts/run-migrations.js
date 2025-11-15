const { AppDataSource } = require('../dist/data-source');

async function runMigrations() {
  console.log('Initializing database connection...');

  try {
    await AppDataSource.initialize();

    console.log('Running migrations...');
    const migrations = await AppDataSource.runMigrations();

    if (migrations.length === 0) {
      console.log('No pending migrations');
    } else {
      console.log(`Applied ${migrations.length} migration(s):`);
      migrations.forEach((m) => console.log(`   - ${m.name}`));
    }
  } catch (error) {
    const message = error?.message ?? '';

    if (message.includes('already been executed')) {
      console.log('Migrations already applied, skipping...');
    } else {
      console.error('Migration failed:', message);
    }
  } finally {
    try {
      if (AppDataSource.isInitialized) {
        console.log('Closing connection...');
        await AppDataSource.destroy();
      }
    } catch {
      // Ignorar erro ao fechar a conexão
    }

    process.exit(0); // Sempre retorna 0 → contêiner não quebra
  }
}

runMigrations();
