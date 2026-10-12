// Importa a instância do Supabase configurada no projeto.
// Essa instância permite acessar tabelas do banco e também o Storage.
import { supabase } from "../config/supabase"


//
// PEGAR CAMINHO DA FOTO PELA URL
//

// Função auxiliar usada para transformar uma URL pública da imagem
// no caminho interno do arquivo dentro do bucket do Supabase Storage.
const getPathFromPublicUrl = (photoUrl) => {
  // Se não existir URL, retorna null para evitar erro.
  if (!photoUrl) return null

  // Parte fixa da URL pública gerada pelo Supabase.
  // Tudo que vier depois desse trecho será o caminho real do arquivo no bucket.
  const marker = "/storage/v1/object/public/alunos/"

  // Divide a URL em duas partes:
  // antes do marker e depois do marker.
  // Exemplo:
  // URL:
  // https://projeto.supabase.co/storage/v1/object/public/alunos/alunos/id/foto.jpg
  //
  // Depois do split:
  // parts[0] = https://projeto.supabase.co
  // parts[1] = alunos/id/foto.jpg
  const parts = photoUrl.split(marker)

  // Se não encontrou o marker na URL, significa que a URL não está no formato esperado.
  if (parts.length < 2) return null

  // Retorna o caminho interno do arquivo no Storage.
  // Esse caminho é usado no método remove().
  return parts[1]
}


//
// UPLOAD DE FOTO COM NOME ÚNICO
//

// Função responsável por enviar a foto do aluno para o Supabase Storage.
// Recebe o arquivo escolhido e o id do aluno.
export const uploadAlunoPhoto = async (file, alunoId) => {
  // Cria um nome único para a foto usando Date.now().
  // Date.now() gera um número baseado no horário atual.
  // Isso evita que uma foto sobrescreva outra com o mesmo nome.
  const fileName = `foto-${Date.now()}.jpg`

  // Define o caminho onde a foto será salva dentro do bucket.
  // Exemplo:
  // alunos/id-do-aluno/foto-123456789.jpg
  const filePath = `alunos/${alunoId}/${fileName}`

  // Converte o arquivo local do celular em um formato que o Supabase consegue enviar.
  // file.uri é o caminho local da imagem no dispositivo.
  const response = await fetch(file.uri)

  // Transforma a resposta em Blob.
  // Blob é um formato binário usado para upload de arquivos.
  const blob = await response.blob()

  // Envia a imagem para o bucket "alunos" no Supabase Storage.
  const { error } = await supabase.storage
    .from("alunos")
    .upload(filePath, blob, {
      // Define o tipo do arquivo enviado.
      // Isso ajuda o navegador e o storage a reconhecerem que é uma imagem JPG.
      contentType: "image/jpeg",
    })

  // Se o upload der erro, exibe no console e interrompe a função.
  if (error) {
    console.log("UPLOAD ERROR:", error)
    throw error
  }

  // Depois do upload, gera a URL pública da imagem.
  // Essa URL será salva na tabela alunos, no campo photo_url.
  const { data } = supabase.storage
    .from("alunos")
    .getPublicUrl(filePath)

  // Retorna a URL pública da foto.
  return data.publicUrl
}


//
// DELETAR FOTO ANTIGA
//

// Função responsável por apagar uma foto antiga do Storage.
// Recebe a URL pública da imagem e converte para o caminho interno.
export const deleteOldPhoto = async (photoUrl) => {
  // Converte a URL pública em caminho interno do Storage.
  const filePath = getPathFromPublicUrl(photoUrl)

  // Se não conseguiu extrair o caminho, encerra a função.
  if (!filePath) return

  // Remove o arquivo do bucket "alunos".
  // O remove() não recebe URL completa, ele recebe o caminho interno do arquivo.
  const { error } = await supabase.storage
    .from("alunos")
    .remove([filePath])

  // Se der erro ao excluir a foto, apenas mostra no console.
  // Aqui não usamos throw porque talvez o aluno ainda possa ser salvo/excluído
  // mesmo se a foto antiga não for removida.
  if (error) {
    console.log("Erro ao excluir foto antiga:", error)
  }
}


//
// LISTAR ALUNOS
//

// Busca todos os alunos cadastrados no banco.
export const getAlunos = async () => {
  const { data, error } = await supabase
    .from("alunos")
    .select(`
      id,
      nome,
      telefone,
      idade,
      photo_url,
      id_escola,
      escolas (
        nome,
        cidade
      )
    `)
    // Ordena os alunos pelo campo created_at.
    // ascending: false significa que os mais recentes aparecem primeiro.
    .order("created_at", { ascending: false })

  // Se houver erro na consulta, interrompe a função.
  if (error) throw error

  // Retorna a lista de alunos.
  return data
}


//
// CRIAR ALUNO
//

// Insere um novo aluno na tabela alunos.
export const createAluno = async (aluno) => {
  const { data, error } = await supabase
    .from("alunos")
    .insert([aluno])
    // select() faz o Supabase retornar o registro criado.
    // Sem isso, o insert pode não devolver os dados do aluno.
    .select()
    // single() informa que esperamos apenas um único registro como resposta.
    // Assim data vem como objeto, e não como array.
    .single()

  if (error) throw error

  // Retorna o aluno criado.
  return data
}


//
// UPDATE
//

// Atualiza os dados de um aluno existente.
export const updateAluno = async (id, aluno) => {
  const { data, error } = await supabase
    .from("alunos")
    .update(aluno)
    // Filtra pelo id para atualizar somente o aluno correto.
    .eq("id", id)
    // Retorna o registro atualizado.
    .select()
    // Como estamos atualizando apenas um aluno, usamos single().
    .single()

  if (error) throw error

  // Retorna o aluno atualizado.
  return data
}


//
// DELETE
//

// Exclui um aluno e, se ele tiver foto, exclui a foto do Storage antes.
export const deleteAluno = async (id, photoUrl) => {
  console.log("Iniciando exclusão do aluno:", id)

  // Se o aluno tiver foto cadastrada, tenta apagar essa foto do Storage.
  if (photoUrl) {
    await deleteOldPhoto(photoUrl)
  }

  // Depois de tentar excluir a foto, remove o aluno da tabela.
  const { data, error } = await supabase
    .from("alunos")
    .delete()
    // Garante que apenas o aluno com esse id seja excluído.
    .eq("id", id)
    // Retorna o registro deletado.
    .select()

  if (error) {
    console.log("Erro ao excluir aluno:", error)
    throw error
  }

  console.log("Aluno excluído:", data)

  // Retorna os dados do aluno excluído.
  return data
}