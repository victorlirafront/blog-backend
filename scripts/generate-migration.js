const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName || migrationName.trim() === '') {
  process.exit(1);
}

const basePath = path.join('src', 'migrations');
const migrationPath = path.join(basePath, migrationName).replace(/\\/g, '/');
const dataSourcePath = path.join('src', 'data-source.ts').replace(/\\/g, '/');

try {
  const output = execSync(
    `typeorm-ts-node-commonjs migration:generate ${migrationPath} -d ${dataSourcePath}`,
    { encoding: 'utf-8', shell: true },
  );

  if (output.includes('No changes in database schema were found')) {
    process.exit(0);
  }

  // Corrige automaticamente DROP + ADD por MODIFY COLUMN
  try {
    const fs = require('fs');
    const migrationFiles = fs
      .readdirSync(basePath)
      .filter((file) => file.includes(migrationName) && file.endsWith('.ts'))
      .map((file) => path.join(basePath, file));

    for (const filePath of migrationFiles) {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Padrão: DROP COLUMN seguido de ADD COLUMN (mesma coluna, mesma tabela)
      // Captura linhas com backticks escapados: \`posts\`
      const dropAddPattern =
        /await queryRunner\.query\(`ALTER TABLE \\`([^\\`]+)\\` DROP COLUMN \\`([^\\`]+)\\``\);\s*await queryRunner\.query\(`ALTER TABLE \\`([^\\`]+)\\` ADD \\`([^\\`]+)\\`\s+([^`]+)`\);/g;

      content = content.replace(
        dropAddPattern,
        (match, table1, col1, table2, col2, colDef) => {
          // Verifica se é a mesma tabela e mesma coluna
          if (table1 === table2 && col1 === col2) {
            return `        await queryRunner.query(\`ALTER TABLE \\\`${table1}\\\` MODIFY COLUMN \\\`${col1}\\\` ${colDef}\`);`;
          }
          return match;
        },
      );

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    }
  } catch (fixError) {}

  process.exit(0);
} catch (error) {
  const errorMessage = error?.stdout || error?.stderr || error?.message || '';

  if (errorMessage.includes('No changes in database schema were found')) {
    process.exit(0);
  }

  process.exit(1);
}
