// Importa o StyleSheet para criar estilos organizados.
import { StyleSheet } from 'react-native';

// Exporta os estilos para uso nos componentes.
export default StyleSheet.create({

  // Campo de input padrão.
  input: {
    backgroundColor: '#F4F7EC', // fundo verde claro
    borderRadius: 15, // cantos arredondados
    padding: 12, // espaçamento interno
    marginBottom: 12, // espaço abaixo
  },

  // Texto de label acima dos campos.
  label: {
    marginBottom: 4,
    marginLeft: 4,
    color: '#555',
    fontSize: 13,
  },

  // Botão principal.
  button: {
    backgroundColor: '#4F8A10',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },

  // Texto do botão.
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Mensagem de erro.
  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Área do avatar (foto do aluno).
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // deixa circular
    backgroundColor: '#EAF4DD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    overflow: 'hidden',

    borderWidth: 2,
    borderColor: '#4F8A10',
  },

  // Texto dentro do avatar quando não tem imagem.
  avatarText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  // Imagem do avatar.
  avatarImg: {
    width: '100%',
    height: '100%',
  },

  // Botão da imagem.
  avatarButton: {
    alignItems: 'center',
    marginBottom: 10,
  },

  // Botão de seleção (select).
  selectButton: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  // Texto do select.
  selectText: {
    color: '#333',
  },

  // Item da lista dentro do select.
  optionList: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionText: {
    color: '#2F3D24',
    fontSize: 16,
  },

  formContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#F6F8EE',
  },

  modalContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 56,
    backgroundColor: '#F6F8EE',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F3D24',
    marginBottom: 16,
  },

  emptySelect: {
    color: '#777',
    textAlign: 'center',
    marginTop: 24,
  },

  cancelButton: {
    padding: 14,
    marginTop: 10,
  },

  cancelText: {
    color: '#B42318',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
