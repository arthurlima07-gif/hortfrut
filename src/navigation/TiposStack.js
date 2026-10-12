import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TiposList from '../screens/tipos/TiposList'
import TipoForm from '../screens/tipos/TipoForm'

const Stack = createNativeStackNavigator()

export default function TiposStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TiposList" component={TiposList} options={{ title: 'Tipos de produto' }} />
      <Stack.Screen name="TipoForm" component={TipoForm} options={{ title: 'Tipo de produto' }} />
    </Stack.Navigator>
  )
}
