// Hooks do React.
// useState cria estados (variáveis reativas).
// useEffect executa efeitos colaterais (ex: carregar dados ao abrir a tela).
import { useEffect, useState } from "react"

// Componentes do React Native usados para montar a interface.
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native"

// Importa TODA a biblioteca de seleção de imagens do Expo.
// O * as significa que você está importando tudo dentro de "ImagePicker".
import * as ImagePicker from "expo-image-picker"

// Importa funções do service que lidam com banco e storage.
import {
  createAluno,
  updateAluno,
  uploadAlunoPhoto,
  deleteOldPhoto,
} from "../../services/alunosService"

// Componente de seleção de escola (modal com busca).
import EscolaSelect from "../../components/EscolaSelect"

// Estilos do formulário.
import styles from "../../styles/formStyles"


export default function AlunoForm({ route, navigation }) {

  // route contém parâmetros enviados pela navegação.
  // Aqui tentamos pegar "aluno".
  // O ?. evita erro caso route ou params não existam.
  const aluno = route?.params?.aluno

  // Estados do formulário.
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [idade, setIdade] = useState("")
  const [id_escola, setId_escola] = useState("")

  // Guarda a nova imagem escolhida pelo usuário (ainda não enviada).
  const [photo, setPhoto] = useState(null)

  // Guarda a URL da foto que já está salva no banco (modo edição).
  const [photoUrlAtual, setPhotoUrlAtual] = useState(null)

  // Estado de carregamento (para mostrar spinner no botão).
  const [loading, setLoading] = useState(false)

  // Mensagem de erro para validação ou falha no backend.
  const [erro, setErro] = useState("")


  // Quando a tela abre em modo edição, preenche os campos automaticamente.
  useEffect(() => {
    if (aluno) {
      setNome(aluno.nome || "")
      setTelefone(aluno.telefone || "")
      setIdade(aluno.idade || "")
      setId_escola(aluno.id_escola || "")
      setPhotoUrlAtual(aluno.photo_url || null)
    }
  }, [aluno])


  // Função que abre a galeria do celular.
  const pickImage = async () => {

    // launchImageLibraryAsync abre a galeria do dispositivo.
    // Ele retorna um objeto com dados da imagem escolhida.
    const result = await ImagePicker.launchImageLibraryAsync({

      // Define que só imagens podem ser selecionadas.
      // MediaTypeOptions é um enum da biblioteca.
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // Permite o usuário cortar a imagem antes de salvar.
      allowsEditing: true,

      // Define qualidade da imagem (0 a 1).
      // 0.7 reduz tamanho do arquivo (melhor performance).
      quality: 0.7,
    })

    // result.canceled indica se o usuário cancelou.
    // Se for false, significa que uma imagem foi escolhida.
    if (!result.canceled) {

      // result.assets é um array com os arquivos selecionados.
      // Pegamos o primeiro (index 0).
      setPhoto(result.assets[0])
    }
  }


  // Validação simples dos campos.
  const validar = () => {
    if (!nome || !telefone || !idade) {
      setErro("Preencha todos os campos")
      return false
    }

    if (!id_escola) {
      setErro("Selecione uma escola")
      return false
    }

    setErro("")
    return true
  }


  // Função principal de salvar.
  const salvar = async () => {
    if (!validar()) return

    setLoading(true)

    try {

      // ===== EDITAR =====
      if (aluno) {

        // Mantém a foto atual por padrão.
        let photo_url = photoUrlAtual

        // Se o usuário escolheu nova foto:
        if (photo) {

          // Monta um objeto representando o arquivo.
          // uri = caminho local da imagem no celular
          // name = nome do arquivo no storage
          // type = tipo MIME
          const file = {
            uri: photo.uri,
            name: `foto-${Date.now()}.jpg`,
            type: "image/jpeg",
          }

          // Faz upload da nova imagem no Supabase Storage.
          const novaPhotoUrl = await uploadAlunoPhoto(file, aluno.id)

          // Se já existia uma imagem antiga, remove ela do storage.
          if (photoUrlAtual) {
            await deleteOldPhoto(photoUrlAtual)
          }

          // Atualiza a URL da foto.
          photo_url = novaPhotoUrl
        }

        // Atualiza o aluno no banco.
        await updateAluno(aluno.id, {
          nome,
          telefone,
          idade,
          id_escola,
          photo_url,
        })

      } else {

        // ===== CRIAR =====

        // Cria o aluno sem foto inicialmente.
        const alunoCriado = await createAluno({
          nome,
          telefone,
          idade,
          id_escola,
          photo_url: null,
        })

        // Se o usuário escolheu uma imagem:
        if (photo) {

          const file = {
            uri: photo.uri,
            name: `foto-${Date.now()}.jpg`,
            type: "image/jpeg",
          }

          // Faz upload usando o id do aluno criado.
          const photo_url = await uploadAlunoPhoto(file, alunoCriado.id)

          // Atualiza o aluno com a URL da foto.
          await updateAluno(alunoCriado.id, {
            photo_url,
          })
        }
      }

      // Volta para a tela anterior.
      navigation.goBack()

    } catch (e) {
      console.log(e)
      setErro("Erro ao salvar aluno")
    } finally {
      setLoading(false)
    }
  }


  return (

    // ScrollView permite rolagem da tela.
    // Importante quando o formulário é grande.
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.label}>Foto do aluno</Text>

      {/* Área clicável para selecionar imagem */}
      <TouchableOpacity onPress={pickImage} style={styles.avatar}>
        {photo ? (
          // Mostra a nova imagem escolhida (preview).
          <Image source={{ uri: photo.uri }} style={styles.avatarImg} />
        ) : photoUrlAtual ? (
          // Mostra imagem atual do banco.
          <Image source={{ uri: photoUrlAtual }} style={styles.avatarImg} />
        ) : (
          // Texto padrão quando não há imagem.
          <Text style={styles.avatarText}>Toque para selecionar foto</Text>
        )}
      </TouchableOpacity>

      {/* Campos do formulário */}
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        keyboardType="numeric"
        value={telefone}
        onChangeText={setTelefone}
      />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 15"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <Text style={styles.label}>Escola</Text>

      {/* Componente de seleção com modal */}
      <EscolaSelect value={id_escola} onSelect={setId_escola} />

      {/* Exibe erro */}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {/* Botão de salvar */}
      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            {aluno ? "Atualizar Aluno" : "Salvar Aluno"}
          </Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  )
}