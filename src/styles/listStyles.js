// Importa o StyleSheet para criar estilos.
import { StyleSheet } from 'react-native';

// Exporta os estilos para uso nas telas.
export default StyleSheet.create({

  // Container principal da tela.
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F8EE',
  },

  // Tela de carregamento centralizada.
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Botão de adicionar novo item.
  addButton: {
    backgroundColor: '#4F8A10',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // ícone + texto lado a lado
    gap: 8,
  },

  // Texto do botão adicionar.
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Container quando lista está vazia.
  emptyContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  // Texto de lista vazia.
  emptyText: {
    color: '#999',
    textAlign: 'center',
  },

  // Card de cada item da lista.
  card: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2, // sombra no Android
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  helperText: {
    color: '#6B7561',
    marginBottom: 12,
  },

  // Cabeçalho do card.
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Avatar com imagem.
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#EEE',
  },

  // Avatar placeholder (sem imagem).
  avatarPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Área de informações do card.
  info: {
    flex: 1,
  },

  // Título principal.
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  // Linha de informações (ícone + texto).
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  // Texto secundário.
  subtitle: {
    color: '#777',
    fontSize: 14,
  },

  // Área dos botões (editar/excluir).
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  // Botão de editar.
  editButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  // Texto do botão editar.
  editText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Botão de excluir.
  deleteButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  // Texto do botão excluir.
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Espaço extra no final da lista.
  listContent: {
    paddingBottom: 20,
  },

  // Área clicável do card.
  cardContent: {
    flex: 1,
  },

});
