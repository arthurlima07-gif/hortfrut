import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { deleteTipo, getTipos } from '../../services/tiposService'
import styles from '../../styles/listStyles'

export default function TiposList({ navigation }) {
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try { setTipos(await getTipos()) } catch (error) { Alert.alert('Não foi possível carregar os tipos', error.message) } finally { setLoading(false) }
  }

  useEffect(() => navigation.addListener('focus', load), [navigation])

  const remover = (tipo) => Alert.alert(
    'Excluir tipo',
    `Deseja excluir o tipo “${tipo.nome}”? Produtos vinculados impedem esta exclusão.`,
    [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: async () => {
      try { await deleteTipo(tipo.id); load() } catch (error) { Alert.alert('Não foi possível excluir', 'Remova ou altere os produtos deste tipo antes de excluí-lo.') }
    }}]
  )

  if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#4F8A10" /></View>

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TipoForm')}>
        <Feather name="plus-circle" size={18} color="#fff" /><Text style={styles.addButtonText}>Novo tipo</Text>
      </TouchableOpacity>
      <Text style={styles.helperText}>Ex.: Fruta, Legume, Suco</Text>
      <FlatList
        data={tipos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tipos.length ? styles.listContent : styles.emptyList}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum tipo cadastrado</Text>}
        renderItem={({ item }) => <View style={styles.card}>
          <View style={styles.cardHeader}><View style={styles.avatarPlaceholder}><Feather name="tag" size={23} color="#4F8A10" /></View><View style={styles.info}><Text style={styles.title}>{item.nome}</Text><Text style={styles.subtitle}>Tipo de produto</Text></View></View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('TipoForm', { tipo: item })}><Feather name="edit-2" size={16} color="#fff" /><Text style={styles.editText}>Editar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => remover(item)}><Feather name="trash-2" size={16} color="#fff" /><Text style={styles.deleteText}>Excluir</Text></TouchableOpacity>
          </View>
        </View>}
      />
    </View>
  )
}
