// Importa o StyleSheet do React Native, usado para criar estilos organizados.
import { StyleSheet } from 'react-native'

// Exporta os estilos para serem usados em outros componentes.
export default StyleSheet.create({

  // Container principal da tela.
  container: {
    flex: 1, // ocupa toda a tela
    padding: 20, // espaçamento interno
    backgroundColor: '#fff', // fundo branco
  },

  // Estilo do título.
  title: {
    fontSize: 22, // tamanho do texto
    fontWeight: 'bold', // deixa em negrito
    marginBottom: 20, // espaço abaixo
  },

  // Estilo dos itens de texto do menu.
  item: {
    fontSize: 16,
    paddingVertical: 12, // espaço em cima e embaixo
    color: '#333', // cor do texto
  },

  // Container de cada item (ícone + texto).
  itemContainer: {
    flexDirection: 'row', // deixa ícone e texto lado a lado
    alignItems: 'center', // alinha verticalmente
    gap: 10, // espaço entre ícone e texto
    marginVertical: 10, // espaço entre os itens
  },

})