const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName || migrationName.trim() === '') {
  console.error('Erro: Nome da migration é obrigatório.');
  console.log('\nUso correto:');
  console.log('  npm run migration:generate -- <NomeDaMigration>');
  console.log('\nExemplo:');
  console.log('  npm run migration:generate -- AddNewColumnToUsers');
  process.exit(1);
}

const basePath = path.join('src', 'migrations');
const migrationPath = path.join(basePath, migrationName).replace(/\\/g, '/');
const dataSourcePath = path.join('src', 'data-source.ts').replace(/\\/g, '/');

try {
  console.log(`Gerando migration em: ${migrationPath}...`);

  const output = execSync(
    `typeorm-ts-node-commonjs migration:generate ${migrationPath} -d ${dataSourcePath}`,
    { encoding: 'utf-8', shell: true },
  );

  if (output.includes('No changes in database schema were found')) {
    console.log('\nAviso: Nenhuma mudança no schema foi encontrada.');
    console.log(
      'Isso significa que o banco de dados já está sincronizado com as entidades.',
    );
    console.log('\nPara criar uma migration vazia, use:');
    console.log('  npm run migration:create -- <NomeDaMigration>');
    process.exit(0);
  }

  console.log('Migration gerada com sucesso!');
  process.exit(0);
} catch (error) {
  const errorMessage = error?.stdout || error?.stderr || error?.message || '';

  if (errorMessage.includes('No changes in database schema were found')) {
    console.log('\nAviso: Nenhuma mudança no schema foi encontrada.');
    console.log(
      'Isso significa que o banco de dados já está sincronizado com as entidades.',
    );
    console.log('\nPara criar uma migration vazia, use:');
    console.log('  npm run migration:create -- <NomeDaMigration>');
    process.exit(0);
  }

  console.error('\nErro ao gerar migration');
  if (errorMessage) console.error(errorMessage);
  process.exit(1);
}
