import { create } from '@web3-storage/w3up-client'
import { filesFromPaths } from 'files-from-path'

const client = await create()

await client.login('alfarseniko@gmail.com')

await client.setCurrentSpace('did:key:z6Mknpxjh9xC5nLhGdd8ZXBoYLpxE2SrDUUCgbbY7taToWsb')

const filename = ""

const path = "./files/" + filename

const files = await filesFromPaths([path])

const directoryCid = await client.uploadDirectory(files)

