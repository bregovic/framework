import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@framework.cz';
  const rawPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  console.log(`🌱 Seeding database...`);
  console.log(`👤 Creating/Updating admin user: ${email}`);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: email,
      name: 'Admin',
      surname: 'Framework',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create default configs
  const defaultConfigs = [
    { key: 'APP_NAME', value: 'Můj Projekt', category: 'GENERAL', description: 'Název aplikace' },
    { key: 'SMTP_HOST', value: '', category: 'TECHNICAL', description: 'SMTP server pro emaily' },
    { key: 'SMTP_PORT', value: '587', category: 'TECHNICAL', description: 'SMTP port' },
    { key: 'CLOUD_STORAGE_PROVIDER', value: 'local', category: 'TECHNICAL', description: 'Poskytovatel úložiště' },
    { key: 'CHATGPT_API_KEY', value: '', category: 'TECHNICAL', description: 'OpenAI API Key' },
  ];

  for (const config of defaultConfigs) {
    await prisma.config.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  console.log(`✅ Database successfully seeded.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
