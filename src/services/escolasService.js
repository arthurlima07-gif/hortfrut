// Importa a instância do Supabase configurada no projeto.
// Ela permite acessar as tabelas do banco de dados.
import { supabase } from "../config/supabase"


// Busca todas as escolas cadastradas na tabela "escolas".
export const getEscolas = async () => {
  const { data, error } = await supabase
    .from("escolas")
    // select("*") busca todas as colunas da tabela.
    .select("*")

  // Se acontecer algum erro na busca, ele será lançado para quem chamou a função.
  if (error) throw error

  // Retorna a lista de escolas.
  return data
}


// Cria uma nova escola na tabela "escolas".
export const createEscola = async (escola) => {
  const { data, error } = await supabase
    .from("escolas")
    // insert(escola) insere os dados recebidos no parâmetro escola.
    // Exemplo de escola: { nome, telefone, cidade }
    .insert(escola)

  if (error) throw error

  // Retorna a resposta do Supabase.
  return data
}


// Atualiza uma escola já existente.
export const updateEscola = async (id, escola) => {
  const { data, error } = await supabase
    .from("escolas")
    // update(escola) altera os campos enviados no objeto escola.
    .update(escola)
    // eq("id", id) garante que apenas a escola com esse id será atualizada.
    .eq("id", id)

  if (error) throw error

  // Retorna a resposta da atualização.
  return data
}


// Exclui uma escola da tabela "escolas".
export const deleteEscola = async (id) => {
  const { error } = await supabase
    .from("escolas")
    // delete() prepara a exclusão.
    .delete()
    // eq("id", id) garante que apenas a escola com esse id será excluída.
    .eq("id", id)

  if (error) throw error
}