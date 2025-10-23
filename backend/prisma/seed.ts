import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...\n');

  // Limpiar datos existentes
  console.log('🗑️  Cleaning existing data...');
  await prisma.statusHistory.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.status.deleteMany();
  console.log('✓ Data cleaned\n');

  // ===== STATUSES =====
  console.log('📊 Creating statuses hierarchy...');
  
  // 1. Crear estado raíz: Scheduled
  const scheduled = await prisma.status.create({
    data: {
      name: 'Scheduled',
      parent_id: null,
      order: 1,
    },
  });
  console.log('  ✓ Scheduled');

  // 2. Crear estados hijos de Scheduled: Checked-In y No-Show
  const checkedIn = await prisma.status.create({
    data: {
      name: 'Checked-In',
      parent_id: scheduled.id,
      order: 2,
    },
  });
  console.log('    ✓ Checked-In (child of Scheduled)');

  const noShow = await prisma.status.create({
    data: {
      name: 'No-Show',
      parent_id: scheduled.id,
      order: 3,
    },
  });
  console.log('    ✓ No-Show (child of Scheduled)');

  // 3. Crear estados hijos de Checked-In: In Consultation y Cancelled
  const inConsultation = await prisma.status.create({
    data: {
      name: 'In Consultation',
      parent_id: checkedIn.id,
      order: 4,
    },
  });
  console.log('      ✓ In Consultation (child of Checked-In)');

  const cancelled = await prisma.status.create({
    data: {
      name: 'Cancelled',
      parent_id: checkedIn.id,
      order: 5,
    },
  });
  console.log('      ✓ Cancelled (child of Checked-In)\n');

  // ===== PROVIDERS =====
  console.log('👨‍⚕️ Creating providers...');
  
  const provider1 = await prisma.provider.create({
    data: {
      full_name: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
    },
  });
  console.log('  ✓ Dr. Juan Pérez - Cardiología');

  const provider2 = await prisma.provider.create({
    data: {
      full_name: 'Dra. María González',
      specialty: 'Medicina General',
    },
  });
  console.log('  ✓ Dra. María González - Medicina General\n');

  // ===== PATIENTS =====
  console.log('👥 Creating patients...');

  // Paciente 1 - Con Dr. Juan Pérez - Estado: Scheduled
  const patient1 = await prisma.patient.create({
    data: {
      full_name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+1-555-0101',
      provider_id: provider1.id,
      status_id: scheduled.id,
    },
  });
  console.log('  ✓ Carlos Rodríguez (Scheduled)');

  // Paciente 2 - Con Dra. María González - Estado: Checked-In
  const patient2 = await prisma.patient.create({
    data: {
      full_name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+1-555-0102',
      provider_id: provider2.id,
      status_id: checkedIn.id,
    },
  });
  console.log('  ✓ Ana Martínez (Checked-In)');

  // Paciente 3 - Con Dr. Juan Pérez - Estado: In Consultation
  const patient3 = await prisma.patient.create({
    data: {
      full_name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      phone: '+1-555-0103',
      provider_id: provider1.id,
      status_id: inConsultation.id,
    },
  });
  console.log('  ✓ Luis Fernández (In Consultation)');

  // Paciente 4 - Con Dra. María González - Estado: No-Show
  const patient4 = await prisma.patient.create({
    data: {
      full_name: 'Patricia Sánchez',
      email: 'patricia.sanchez@email.com',
      phone: '+1-555-0104',
      provider_id: provider2.id,
      status_id: noShow.id,
    },
  });
  console.log('  ✓ Patricia Sánchez (No-Show)');

  // Paciente 5 - Con Dr. Juan Pérez - Estado: Cancelled
  const patient5 = await prisma.patient.create({
    data: {
      full_name: 'Roberto López',
      email: 'roberto.lopez@email.com',
      phone: '+1-555-0105',
      provider_id: provider1.id,
      status_id: cancelled.id,
    },
  });
  console.log('  ✓ Roberto López (Cancelled)');

  // Paciente 6 - Con Dra. María González - Estado: Scheduled
  const patient6 = await prisma.patient.create({
    data: {
      full_name: 'Sofía García',
      email: 'sofia.garcia@email.com',
      phone: '+1-555-0106',
      provider_id: provider2.id,
      status_id: scheduled.id,
    },
  });
  console.log('  ✓ Sofía García (Scheduled)\n');

  // ===== STATUS HISTORY =====
  console.log('📜 Creating status history...');

  // Historial para paciente 3 (ha pasado por varios estados)
  await prisma.statusHistory.create({
    data: {
      patient_id: patient3.id,
      status_id: scheduled.id,
      changed_at: new Date('2024-01-15T09:00:00'),
    },
  });

  await prisma.statusHistory.create({
    data: {
      patient_id: patient3.id,
      status_id: checkedIn.id,
      changed_at: new Date('2024-01-15T09:30:00'),
    },
  });

  await prisma.statusHistory.create({
    data: {
      patient_id: patient3.id,
      status_id: inConsultation.id,
      changed_at: new Date('2024-01-15T10:00:00'),
    },
  });

  // Historial para paciente 2
  await prisma.statusHistory.create({
    data: {
      patient_id: patient2.id,
      status_id: scheduled.id,
      changed_at: new Date('2024-01-16T08:00:00'),
    },
  });

  await prisma.statusHistory.create({
    data: {
      patient_id: patient2.id,
      status_id: checkedIn.id,
      changed_at: new Date('2024-01-16T08:45:00'),
    },
  });

  console.log('  ✓ Created status history for patients\n');

  // ===== SUMMARY =====
  console.log('✅ Seed completed successfully!\n');
  console.log('📋 Summary:');
  console.log('─────────────────────────────────');
  console.log('Status hierarchy:');
  console.log('└─ Scheduled');
  console.log('   ├─ Checked-In');
  console.log('   │  ├─ In Consultation');
  console.log('   │  └─ Cancelled');
  console.log('   └─ No-Show\n');
  console.log('Providers: 2 created');
  console.log('  • Dr. Juan Pérez (Cardiología) - 3 patients');
  console.log('  • Dra. María González (Medicina General) - 3 patients\n');
  console.log('Patients: 6 created');
  console.log('  • Carlos Rodríguez (Scheduled)');
  console.log('  • Ana Martínez (Checked-In)');
  console.log('  • Luis Fernández (In Consultation)');
  console.log('  • Patricia Sánchez (No-Show)');
  console.log('  • Roberto López (Cancelled)');
  console.log('  • Sofía García (Scheduled)');
  console.log('─────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
