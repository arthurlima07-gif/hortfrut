// Importa hooks do React.
// useState cria variáveis que mudam na tela.
// useEffect executa uma ação automaticamente quando o componente carrega.
import { useEffect, useState } from "react"

// Importa componentes visuais do React Native.
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList } from "react-native"

// Importa a função responsável por buscar as escolas cadastradas no Supabase.
import { getEscolas } from "../services/escolasService"

// Importa o arquivo de estilos do formulário.
import styles from "../styles/formStyles"


// Componente usado para selecionar uma escola.
// value guarda o id da escola selecionada.
// onSelect é a função que envia a escola escolhida para o componente pai.
export default function EscolaSelect({ value, onSelect }) {

  // Controla se o modal está aberto ou fechado.
  // false = fechado
  // true = aberto
  const [modalVisible, setModalVisible] = useState(false)

  // Guarda a lista de escolas carregadas do banco.
  const [escolas, setEscolas] = useState([])

  // Guarda o texto digitado no campo de busca.
  const [search, setSearch] = useState("")


  // Função assíncrona que busca as escolas no banco.
  const load = async () => {
    // Chama o service getEscolas, que busca os dados no Supabase.
    const data = await getEscolas()

    // Salva as escolas no estado para aparecerem na lista.
    setEscolas(data)
  }


  // Executa a função load uma vez quando o componente aparece na tela.
  // O array [] vazio significa: executar apenas na primeira renderização.
  useEffect(() => {
    load()
  }, [])


  // Cria uma nova lista contendo apenas as escolas que combinam com a busca.
  const filtered = escolas.filter(e =>
    // e.nome é o nome da escola.
    // toLowerCase() transforma o texto em letras minúsculas.
    // Isso evita diferença entre maiúsculas e minúsculas.
    // Exemplo: buscar "teste" também encontra "Teste", "TESTE" ou "TesTe".
    // includes() verifica se o nome da escola contém o texto digitado.
    e.nome.toLowerCase().includes(search.toLowerCase())
  )


  // Procura na lista de escolas aquela que tem o id igual ao value.
  // O ?. evita erro caso a escola não seja encontrada.
  // Se encontrar, pega o nome da escola.
  const selectedName = escolas.find(e => e.id === value)?.nome


  return (
    <View>

      {/* Botão que abre o modal de seleção */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>
          {/* 
            Se já tiver uma escola selecionada, mostra o nome dela.
            Se não tiver nenhuma selecionada, mostra "Selecionar escola".
          */}
          {selectedName || "Selecionar escola"}
        </Text>
      </TouchableOpacity>


      {/* Modal é uma janela que aparece por cima da tela atual */}
      <Modal visible={modalVisible} animationType="slide">

        <View style={{ padding: 16 }}>

          {/* Campo de texto usado para pesquisar escolas */}
          <TextInput
            placeholder="Buscar escola..."
            value={search}

            // Atualiza o estado search a cada letra digitada.
            // Isso faz a lista ser filtrada automaticamente.
            onChangeText={setSearch}

            style={styles.input}
          />


          {/* Lista das escolas filtradas */}
          <FlatList
            data={filtered}

            // Define uma chave única para cada escola.
            // Isso ajuda o React Native a renderizar a lista corretamente.
            keyExtractor={(item) => item.id}

            // Define como cada escola será exibida na lista.
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionList}

                // Quando o usuário toca em uma escola:
                onPress={() => {
                  // Envia o id da escola selecionada para o formulário.
                  onSelect(item.id)

                  // Fecha o modal.
                  setModalVisible(false)

                  // Limpa o campo de busca para a próxima vez que abrir.
                  setSearch("")
                }}
              >
                <Text style={styles.optionText}>
                  {item.nome}
                </Text>
              </TouchableOpacity>
            )}
          />


          {/* Botão usado para fechar o modal sem selecionar escola */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ textAlign: "center", color: "red" }}>
              Fechar
            </Text>
          </TouchableOpacity>

        </View>

      </Modal>

    </View>
  )
}