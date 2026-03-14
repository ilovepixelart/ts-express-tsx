import getModels from '../src/models'

export async function up() {
  console.log('Migration - up')
  const { User } = await getModels()

  // Write migration here
  await User.findOneAndUpdate({ name: 'John Doe' }, { name: 'John Doe', role: 'admin' }, { upsert: true, returnDocument: 'after' })
}

export async function down() {
  console.log('Migration - down')
  const { User } = await getModels()
  // Write migration here
  await User.deleteMany({ role: 'admin' })
}
