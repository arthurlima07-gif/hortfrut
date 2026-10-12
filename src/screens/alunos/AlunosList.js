// Importa os hooks do React.
// useState guarda informações que podem mudar na tela.
// useEffect executa uma ação quando a tela é carregada ou atualizada.
import { useEffect, useState } from "react"

// Importa componentes visuais do React Native.
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native"

// Importa a biblioteca de ícones Feather.
import { Feather } from "@expo/vector-icons"

// Importa as funções responsáveis por buscar e excluir alunos.
import { getAlunos, deleteAluno } from "../../services/alunosService"

// Importa os estilos da tela de listagem.
import styles from "../../styles/listStyles"


// Componente responsável por listar os alunos cadastrados.
export default function AlunosList({ navigation }) {
  // Guarda a lista de alunos vinda do banco.
  const [alunos, setAlunos] = useState([])

  // Controla o estado de carregamento da tela.
  const [loading, setLoading] = useState(false)


  // Função responsável por buscar os alunos no banco.
  const load = async () => {
    setLoading(true)

    try {
      // Chama o service que busca os alunos no Supabase.
      const data = await getAlunos()

      // Atualiza a lista de alunos na tela.
      setAlunos(data)
    } catch (e) {
      // Exibe erro no console caso a busca falhe.
      console.log(e)
    } finally {
      // Finaliza o carregamento, mesmo se der erro.
      setLoading(false)
    }
  }


  // Executa a função load sempre que a tela receber foco.
  // navigation.addListener("focus", load) faz a lista atualizar ao voltar do formulário.
  useEffect(() => {
    const unsub = navigation.addListener("focus", load)

    // Remove o listener quando o componente sair da tela.
    return unsub
  }, [navigation])


  // Função chamada ao clicar em excluir.
  const handleDelete = async (aluno) => {
    try {
      // Envia o id do aluno e a URL da foto para o service.
      // Assim o service pode excluir a imagem do Storage e depois o aluno da tabela.
      await deleteAluno(aluno.id, aluno.photo_url)

      // Recarrega a lista depois da exclusão.
      await load()
    } catch (e) {
      console.log("Erro no handleDelete:", e)
    }
  }


  // Se estiver carregando, mostra um indicador de carregamento.
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6EC1B6" />
      </View>
    )
  }


  return (
    <View style={styles.container}>

      {/* Botão para abrir o formulário de cadastro de aluno */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AlunoForm")}
      >
        <Feather name="plus-circle" size={18} color="#FFF" />
        <Text style={styles.addButtonText}>Novo Aluno</Text>
      </TouchableOpacity>


      {/* Se não houver alunos cadastrados, exibe uma mensagem */}
      {alunos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum aluno cadastrado</Text>
        </View>
      ) : (

        // FlatList renderiza listas de forma otimizada.
        // Ela é melhor que map para listas grandes, pois carrega os itens de maneira eficiente.
        <FlatList
          data={alunos}

          // Define uma chave única para cada aluno.
          // Isso ajuda o React Native a identificar cada item da lista.
          keyExtractor={(item) => item.id}

          // Define como cada aluno será exibido.
          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* Cabeçalho do card, contendo foto e informações principais */}
              <View style={styles.cardHeader}>

                {/* Se o aluno tiver foto, exibe a imagem */}
                {item.photo_url ? (
                  <Image
                    source={{ uri: item.photo_url }}
                    style={styles.avatar}
                  />
                ) : (
                  // Se não tiver foto, exibe um espaço padrão com ícone de usuário.
                  <View style={styles.avatarPlaceholder}>
                    <Feather name="user" size={24} color="#999" />
                  </View>
                )}

                {/* Área das informações do aluno */}
                <View style={styles.info}>
                  <Text style={styles.title}>{item.nome}</Text>

                  {/* Linha com telefone */}
                  <View style={styles.infoRow}>
                    <Feather name="phone" size={14} color="#777" />
                    <Text style={styles.subtitle}>{item.telefone}</Text>
                  </View>

                  {/* Linha com idade */}
                  <View style={styles.infoRow}>
                    <Feather name="calendar" size={14} color="#777" />
                    <Text style={styles.subtitle}>{item.idade} anos</Text>
                  </View>

                  {/* 
                    Se o aluno tiver dados da escola relacionados,
                    exibe nome e cidade da escola.
                    item.escolas vem do relacionamento feito no select do Supabase.
                  */}
                  {item.escolas && (
                    <View style={styles.infoRow}>
                      <Feather name="home" size={14} color="#777" />
                      <Text style={styles.subtitle}>
                        {item.escolas.nome} - {item.escolas.cidade}
                      </Text>
                    </View>
                  )}
                </View>
              </View>


              {/* Área dos botões de ação */}
              <View style={styles.actions}>

                {/* Botão de editar */}
                <TouchableOpacity
                  style={styles.editButton}

                  // Navega para o formulário enviando o aluno selecionado.
                  // O formulário usa esses dados para preencher os campos automaticamente.
                  onPress={() => navigation.navigate("AlunoForm", { aluno: item })}
                >
                  <Feather name="edit-2" size={16} color="#FFF" />
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>


                {/* Botão de excluir */}
                <TouchableOpacity
                  style={styles.deleteButton}

                  // Chama a função de exclusão passando o aluno inteiro.
                  // Isso permite usar tanto o id quanto a photo_url.
                  onPress={() => handleDelete(item)}
                >
                  <Feather name="trash-2" size={16} color="#FFF" />
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}