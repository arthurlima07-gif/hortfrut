// Importa os hooks do React.
// useState cria estados para armazenar os valores digitados.
// useEffect executa uma ação quando o componente carrega ou quando algum valor observado muda.
import { useEffect, useState } from 'react'

// Importa componentes visuais do React Native.
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'

// Importa os estilos do formulário.
import styles from '../../styles/formStyles'

// Importa as funções responsáveis por cadastrar e atualizar escolas no Supabase.
import { createEscola, updateEscola } from '../../services/escolasService'


// Componente do formulário de escola.
// Ele é usado tanto para cadastrar uma nova escola quanto para editar uma escola existente.
export default function EscolaForm({ route, navigation }) {

  // Recupera a escola enviada pela navegação.
  // Se existir uma escola em route.params, significa que o formulário está em modo edição.
  // Se não existir, significa que o formulário será usado para cadastro.
  const escola = route.params?.escola

  // Estados que armazenam os valores digitados nos campos do formulário.
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')

  // Estado usado para exibir mensagens de erro na tela.
  const [erro, setErro] = useState('')


  // Quando o formulário recebe uma escola para edição,
  // os campos são preenchidos automaticamente com os dados existentes.
  useEffect(() => {
    if (escola) {
      setNome(escola.nome)
      setTelefone(escola.telefone)
      setCidade(escola.cidade)
    }
  }, [escola])


  // Função responsável por validar os campos obrigatórios.
  const validar = () => {
    // Verifica se nome ou telefone estão vazios.
    if (!nome || !telefone) {
      setErro('Preencha os campos')
      return false
    }

    // Se estiver tudo correto, limpa a mensagem de erro.
    setErro('')
    return true
  }


  // Função executada ao clicar no botão de salvar.
  const salvar = async () => {
    // Se a validação falhar, interrompe a função.
    if (!validar()) return

    try {
      if (escola) {
        // Se existe uma escola, atualiza o registro no banco.
        // escola.id identifica qual escola será alterada.
        await updateEscola(escola.id, { nome, telefone, cidade })
      } else {
        // Se não existe escola, cria um novo registro no banco.
        await createEscola({ nome, telefone, cidade })
      }

      // Volta para a tela anterior após salvar.
      navigation.goBack()
    } catch (e) {
      // Se acontecer algum erro no cadastro ou atualização,
      // exibe uma mensagem na tela.
      setErro('Erro ao salvar escola')
    }
  }


  return (
    // ScrollView permite rolar a tela caso o conteúdo fique maior que a altura do dispositivo.
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
      />

      {/* Exibe a mensagem de erro somente se existir algum erro */}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {/* Botão para cadastrar ou atualizar a escola */}
      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>
          {/* Se estiver editando, mostra "Atualizar"; se estiver cadastrando, mostra "Salvar" */}
          {escola ? 'Atualizar' : 'Salvar'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}