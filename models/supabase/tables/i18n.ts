import { getSupabaseServerClient } from 'models/supabase/client/server'
import { I18N_TABLE } from '.'
import { Translation } from '~/models/translation'
import { GetServerSidePropsContext } from 'next'

export async function getAllTranslationsForLocale(
  ctx: GetServerSidePropsContext,
  locale: string,
) {
  return (
    await getSupabaseServerClient(ctx)
      .from<Translation>(I18N_TABLE)
      .select('id,locale,key,value')
      .match({ locale })
      .order('id')
  ).data
}

export async function insertTranslation(
  ctx: GetServerSidePropsContext,
  translation: Translation,
) {
  return await getSupabaseServerClient(ctx)
    .from<Translation>(I18N_TABLE)
    .upsert(translation)
}

export async function updateTranslation(
  ctx: GetServerSidePropsContext,
  translation: Translation,
) {
  return await getSupabaseServerClient(ctx)
    .from<Translation>(I18N_TABLE)
    .upsert(translation)
}

export async function deleteTranslation(
  ctx: GetServerSidePropsContext,
  translation: Translation,
) {
  return await getSupabaseServerClient(ctx)
    .from<Translation>(I18N_TABLE)
    .delete()
    .match(translation)
}
