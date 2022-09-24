import client from 'db/supabase/client'
import { I18N_TABLE } from '.'
import { Translation } from '../types'

export async function getAllTranslationsForLocale(locale: string) {
  return (
    await client
      .from<Translation>(I18N_TABLE)
      .select('id,locale,key,value')
      .match({ locale })
      .order('id')
  ).data
}

export async function insertTranslation(translation: Translation) {
  return await client.from<Translation>(I18N_TABLE).upsert(translation)
}

export async function updateTranslation(translation: Translation) {
  return await client.from<Translation>(I18N_TABLE).upsert(translation)
}

export async function removeTranslation(translation: Translation) {
  return await client.from<Translation>(I18N_TABLE).delete().match(translation)
}
