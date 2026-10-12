import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { deleteProduto, getProdutos } from '../../services/produtosService'
import styles from '../../styles/listStyles'

export default function ProdutosList({ navigation }) {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const load = async () => { setLoading(true); try { setProdutos(await getProdutos()) } catch (error) { Alert.alert('Não foi possível carregar os produtos', error.message) } finally { setLoading(false) } }
  useEffect(() => navigation.addListener('focus', load), [navigation])
  const remover = (produto) => Alert.alert('Excluir produto', `Deseja excluir “${produto.nome}”?`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await deleteProduto(produto.id); load() } catch { Alert.alert('Não foi possível excluir o produto.') } } }])

  if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#4F8A10" /></View>
  return <View style={styles.container}>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ProdutoForm')}><Feather name="plus-circle" size={18} color="#fff" /><Text style={styles.addButtonText}>Novo produto</Text></TouchableOpacity>
    <FlatList data={produtos} keyExtractor={(item) => item.id} contentContainerStyle={produtos.length ? styles.listContent : styles.emptyList} ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado</Text>} renderItem={({ item }) => <View style={styles.card}>
      <View style={styles.cardHeader}><View style={styles.avatarPlaceholder}><Feather name="shopping-basket" size={23} color="#4F8A10" /></View><View style={styles.info}><Text style={styles.title}>{item.nome}</Text><View style={styles.infoRow}><Feather name="tag" size={14} color="#777" /><Text style={styles.subtitle}>{item.tipos?.nome || 'Tipo não informado'}</Text></View></View></View>
      <View style={styles.actions}><TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProdutoForm', { produto: item })}><Feather name="edit-2" size={16} color="#fff" /><Text style={styles.editText}>Editar</Text></TouchableOpacity><TouchableOpacity style={styles.deleteButton} onPress={() => remover(item)}><Feather name="trash-2" size={16} color="#fff" /><Text style={styles.deleteText}>Excluir</Text></TouchableOpacity></View>
    </View>} />
  </View>
}
