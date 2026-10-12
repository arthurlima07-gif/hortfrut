import { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { createTipo, updateTipo } from '../../services/tiposService'
import styles from '../../styles/formStyles'

export default function TipoForm({ navigation, route }) {
  const tipo = route.params?.tipo
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  useEffect(() => { if (tipo) setNome(tipo.nome) }, [tipo])

  const salvar = async () => {
    const nomeLimpo = nome.trim()
    if (!nomeLimpo) return setErro('Informe o nome do tipo.')
    try { tipo ? await updateTipo(tipo.id, { nome: nomeLimpo }) : await createTipo({ nome: nomeLimpo }); navigation.goBack() }
    catch { setErro('Não foi possível salvar o tipo. Verifique se ele já existe.') }
  }

  return <ScrollView contentContainerStyle={styles.formContainer}>
    <Text style={styles.label}>Nome do tipo</Text>
    <TextInput style={styles.input} placeholder="Ex.: Fruta" value={nome} onChangeText={setNome} autoCapitalize="words" />
    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    <TouchableOpacity style={styles.button} onPress={salvar}><Text style={styles.buttonText}>{tipo ? 'Atualizar tipo' : 'Salvar tipo'}</Text></TouchableOpacity>
  </ScrollView>
}
