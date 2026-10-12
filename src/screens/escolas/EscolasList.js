// Importa os hooks do React.
// useState guarda valores que podem mudar na tela.
// useEffect executa ações automáticas, como carregar dados ao abrir a tela.
import { useEffect, useState } from "react"

// Importa componentes visuais do React Native.
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"

// Importa a biblioteca de ícones Feather.
import { Feather } from "@expo/vector-icons"

// Importa as funções responsáveis por buscar e excluir escolas no Supabase.
import { getEscolas, deleteEscola } from "../../services/escolasService"

// Importa os estilos da tela de listagem.
import styles from "../../styles/listStyles"


// Componente responsável por listar as escolas cadastradas.
export default function EscolasList({ navigation }) {

  // Guarda a lista de escolas vinda do banco.
  const [escolas, setEscolas] = useState([])

  // Controla se a tela está carregando.
  const [loading, setLoading] = useState(true)


  // Função responsável por buscar as escolas no banco.
  const load = async () => {
    setLoading(true)

    try {
      // Chama o service que busca as escolas no Supabase.
      const data = await getEscolas()

      // Atualiza a lista exibida na tela.
      setEscolas(data)
    } catch (e) {
      // Exibe erro no console caso a busca falhe.
      console.log("Erro ao carregar escolas:", e)
    } finally {
      // Finaliza o carregamento mesmo se houver erro.
      setLoading(false)
    }
  }


  // Executa o carregamento sempre que a tela receber foco.
  // Isso faz a lista atualizar quando o usuário volta do formulário.
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load)

    // Remove o listener quando o componente sair da tela.
    return unsubscribe
  }, [navigation])


  // Função chamada ao clicar no botão de excluir.
  const handleDelete = async (id) => {
    try {
      // Exclui a escola pelo id.
      await deleteEscola(id)

      // Recarrega a lista depois da exclusão.
      await load()
    } catch (e) {
      console.log("Erro ao excluir escola:", e)
    }
  }


  // Enquanto os dados estão sendo carregados, mostra um indicador de carregamento.
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6EC1B6" />
      </View>
    )
  }


  return (
    <View style={styles.container}>

      {/* Botão que abre o formulário para cadastrar uma nova escola */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EscolaForm")}
      >
        <Feather name="plus-circle" size={18} color="#FFF" />
        <Text style={styles.addButtonText}>Nova Escola</Text>
      </TouchableOpacity>


      {/* Se não houver escolas cadastradas, exibe uma mensagem */}
      {escolas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma escola cadastrada</Text>
        </View>
      ) : (

        // FlatList renderiza a lista de forma otimizada.
        // Ela é mais indicada que map para listas, pois melhora performance em listas maiores.
        <FlatList
          data={escolas}

          // Define uma chave única para cada item da lista.
          // O id vindo do banco é usado para identificar cada escola.
          keyExtractor={(item) => item.id}

          // Aplica estilo no conteúdo interno da lista.
          contentContainerStyle={styles.listContent}

          // Define como cada escola será exibida na tela.
          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* Área clicável do card.
                  Ao clicar nela, o usuário navega para a tela de alunos.
                  O id da escola é enviado como parâmetro para filtrar ou relacionar os alunos. */}
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() =>
                  navigation.navigate("Alunos", { idEscola: item.id })
                }
              >
                <View style={styles.cardHeader}>

                  {/* Espaço visual usado como avatar/ícone da escola */}
                  <View style={styles.avatarPlaceholder}>
                    <Feather name="home" size={24} color="#999" />
                  </View>

                  {/* Área com as informações da escola */}
                  <View style={styles.info}>
                    <Text style={styles.title}>{item.nome}</Text>

                    {/* Linha que mostra a cidade da escola */}
                    <View style={styles.infoRow}>
                      <Feather name="map-pin" size={14} color="#777" />
                      <Text style={styles.subtitle}>{item.cidade}</Text>
                    </View>

                    {/* Linha que mostra o telefone da escola */}
                    <View style={styles.infoRow}>
                      <Feather name="phone" size={14} color="#777" />
                      <Text style={styles.subtitle}>{item.telefone}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>


              {/* Área dos botões de ação do card */}
              <View style={styles.actions}>

                {/* Botão de editar escola */}
                <TouchableOpacity
                  style={styles.editButton}

                  // Navega para o formulário enviando a escola selecionada.
                  // O formulário usa esses dados para preencher os campos automaticamente.
                  onPress={() =>
                    navigation.navigate("EscolaForm", { escola: item })
                  }
                >
                  <Feather name="edit-2" size={16} color="#FFF" />
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>


                {/* Botão de excluir escola */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
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