import { StorageClient } from '@supabase/storage-js'

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`
const SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})

export async function uploadFile(file: any, path: string) {
  const { data, error } = await storageClient
    .from(process.env.SUPABASE_BUCKET)
    .upload(path, file)

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteFile(path: string) {
  const { data, error } = await storageClient
    .from(process.env.SUPABASE_BUCKET)
    .remove([path])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data
}

export async function listFiles() {
  const { data, error } = await storageClient
    .from(process.env.SUPABASE_BUCKET)
    .list('blog')

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data
}
