import bcrypt from 'bcryptjs'

const password = 'KuysJP16!'
const hashed = await bcrypt.hash(password, 10)
console.log(hashed)