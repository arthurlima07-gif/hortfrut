import { supabase } from '../config/supabase'

export const getProdutos = async () => {
  const { data, error } = await supabase
    .from('produtos')
    .select('id, nome, id_tipo, tipos ( nome )')
    .order('nome')
  if (error) throw error
  return data
}

export const createProduto = async (produto) => {
  const { data, error } = await supabase.from('produtos').insert(produto).select().single()
  if (error) throw error
  return data
}

export const updateProduto = async (id, produto) => {
  const { data, error } = await supabase.from('produtos').update(produto).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const deleteProduto = async (id) => {
  const { error } = await supabase.from('produtos').delete().eq('id', id)
  if (error) throw error
}
