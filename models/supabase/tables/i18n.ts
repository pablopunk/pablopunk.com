import client from 'models/supabase/client'
import { I18N_TABLE } from '.'
import { Translation, TranslationInsert } from '~/models/translation'

export async function getAllTranslationsForLocale(locale: string) {
  return (
    await client
      .from<Translation>(I18N_TABLE)
      .select('id,locale,key,value')
      .match({ locale })
      .order('id')
  ).data
}

export async function insertTranslation(translation: TranslationInsert) {
  return await client.from<Translation>(I18N_TABLE).upsert(translation)
}

export async function updateTranslation(translation: TranslationInsert) {
  return await client.from<Translation>(I18N_TABLE).upsert(translation)
}

export async function deleteTranslation(translation: TranslationInsert) {
  return await client.from<Translation>(I18N_TABLE).delete().match(translation)
}
