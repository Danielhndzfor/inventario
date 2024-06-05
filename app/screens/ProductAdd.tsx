import React, {useState} from 'react';
import {Button, SafeAreaView, Text, TextInput} from 'react-native';
import LocalDB from '../persistance/localdb';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

export default function ProductAdd(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nombre, setNombre] = useState<string>('');
  const [precio, setPrecio] = useState<string>('0');
  const [minStock, setMinStock] = useState<string>('0');

  const btnGuardarOnPress = async () => {
    const db = await LocalDB.connect();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO productos (nombre, precio, minStock) VALUES (?, ?, ?)',
        [nombre, precio, minStock],
      );
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView>
      <Text>Nombre</Text>
      <TextInput placeholderTextColor={'#9A8C98'} onChangeText={t => setNombre(t)} />
      <Text>Precio</Text>
      <TextInput placeholderTextColor={'#9A8C98'} onChangeText={t => setPrecio(t)} />
      <Text>Min. Stock</Text>
      <TextInput placeholderTextColor={'#9A8C98'} onChangeText={t => setMinStock(t)} />
      <Button title="Guardar" onPress={btnGuardarOnPress} />
    </SafeAreaView>
  );
}
