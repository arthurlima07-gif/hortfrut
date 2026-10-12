import { supabase } from '../config/supabase'

export const getTipos = async () => {
  const { data, error } = await supabase.from('tipos').select('*').order('nome')
  if (error) throw error
  return data
}

export const createTipo = async ({ nome }) => {
  const { data, error } = await supabase.from('tipos').insert({ nome }).select().single()
  if (error) throw error
  return data
}

export const updateTipo = async (id, { nome }) => {
  const { data, error } = await supabase.from('tipos').update({ nome }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const deleteTipo = async (id) => {
  const { error } = await supabase.from('tipos').delete().eq('id', id)
  if (error) throw error
}
