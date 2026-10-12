import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProdutosList from '../screens/produtos/ProdutosList'
import ProdutoForm from '../screens/produtos/ProdutoForm'

const Stack = createNativeStackNavigator()

export default function ProdutosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProdutosList" component={ProdutosList} options={{ title: 'Produtos' }} />
      <Stack.Screen name="ProdutoForm" component={ProdutoForm} options={{ title: 'Produto' }} />
    </Stack.Navigator>
  )
}
