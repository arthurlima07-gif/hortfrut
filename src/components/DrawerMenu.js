// Importa componentes básicos do React Native
import { View, Text, TouchableOpacity } from 'react-native'

// Importa ícones da biblioteca Feather (Expo)
import { Feather } from '@expo/vector-icons'

// Importa os estilos do drawer
import styles from '../styles/drawerStyles'


// Componente funcional do menu lateral (Drawer)
export default function DrawerMenu({ navigation }) {
  return (
    // Container principal do menu
    <View style={styles.container}>

      {/* Título do menu */}
      <Text style={styles.title}>Menu</Text>

      {/* BOTÃO ESCOLAS */}
      <TouchableOpacity
        style={styles.itemContainer} // estilo do item (linha com ícone + texto)
        onPress={() => navigation.navigate('Escolas')} // navega para a tela "Escolas"
      >
        {/* Ícone */}
        <Feather name="home" size={20} color="#333" />

        {/* Texto do botão */}
        <Text style={styles.item}>Escolas</Text>
      </TouchableOpacity>

      {/* BOTÃO NOVA ESCOLA */}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Nova Escola')} // navega para tela de cadastro de escola
      >
        <Feather name="plus-circle" size={20} color="#333" />
        <Text style={styles.item}>Nova Escola</Text>
      </TouchableOpacity>

      {/* BOTÃO ALUNOS */}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Alunos')} // navega para lista de alunos
      >
        <Feather name="users" size={20} color="#333" />
        <Text style={styles.item}>Alunos</Text>
      </TouchableOpacity>

      {/* BOTÃO NOVO ALUNO */}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Novo Aluno')} // navega para cadastro de aluno
      >
        <Feather name="user-plus" size={20} color="#333" />
        <Text style={styles.item}>Novo Aluno</Text>
      </TouchableOpacity>

    </View>
  )
}