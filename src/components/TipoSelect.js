import { useEffect, useState } from 'react'
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getTipos } from '../services/tiposService'
import styles from '../styles/formStyles'

export default function TipoSelect({ value, onSelect }) {
  const [visible, setVisible] = useState(false)
  const [tipos, setTipos] = useState([])
  const [busca, setBusca] = useState('')

  const load = async () => setTipos(await getTipos())
  useEffect(() => { load() }, [])
  useEffect(() => { if (visible) load() }, [visible])

  const selecionado = tipos.find((tipo) => tipo.id === value)
  const filtrados = tipos.filter((tipo) => tipo.nome.toLowerCase().includes(busca.toLowerCase()))

  return (
    <View>
      <TouchableOpacity style={styles.selectButton} onPress={() => setVisible(true)}>
        <Text style={styles.selectText}>{selecionado?.nome || 'Selecionar tipo'}</Text>
      </TouchableOpacity>
      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escolha o tipo</Text>
          <TextInput style={styles.input} placeholder="Buscar tipo..." value={busca} onChangeText={setBusca} />
          <FlatList
            data={filtrados}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptySelect}>Nenhum tipo cadastrado.</Text>}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.optionList} onPress={() => { onSelect(item.id); setBusca(''); setVisible(false) }}>
                <Text style={styles.optionText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(false)}><Text style={styles.cancelText}>Fechar</Text></TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
