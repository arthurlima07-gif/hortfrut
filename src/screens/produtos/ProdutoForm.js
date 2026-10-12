import { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import TipoSelect from '../../components/TipoSelect'
import { createProduto, updateProduto } from '../../services/produtosService'
import styles from '../../styles/formStyles'

export default function ProdutoForm({ navigation, route }) {
  const produto = route.params?.produto
  const [nome, setNome] = useState('')
  const [idTipo, setIdTipo] = useState('')
  const [erro, setErro] = useState('')
  useEffect(() => { if (produto) { setNome(produto.nome); setIdTipo(produto.id_tipo) } }, [produto])
  const salvar = async () => {
    const nomeLimpo = nome.trim()
    if (!nomeLimpo || !idTipo) return setErro('Informe o produto e selecione um tipo.')
    try { produto ? await updateProduto(produto.id, { nome: nomeLimpo, id_tipo: idTipo }) : await createProduto({ nome: nomeLimpo, id_tipo: idTipo }); navigation.goBack() }
    catch { setErro('Não foi possível salvar o produto.') }
  }
  return <ScrollView contentContainerStyle={styles.formContainer}>
    <Text style={styles.label}>Nome do produto</Text><TextInput style={styles.input} placeholder="Ex.: Banana" value={nome} onChangeText={setNome} autoCapitalize="words" />
    <Text style={styles.label}>Tipo *</Text><TipoSelect value={idTipo} onSelect={setIdTipo} />
    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    <TouchableOpacity style={styles.button} onPress={salvar}><Text style={styles.buttonText}>{produto ? 'Atualizar produto' : 'Salvar produto'}</Text></TouchableOpacity>
  </ScrollView>
}
