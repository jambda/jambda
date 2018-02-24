import putData from './put-data'

const notUniqueData = Object.create({}, putData)

notUniqueData.string = 'This is a NON UNIQUE Patch String'

export default notUniqueData
