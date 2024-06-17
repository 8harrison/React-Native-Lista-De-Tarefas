import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';
import { useState, useEffect } from 'react';
import TaskService from './databse/services/TaskService';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    return setTasks(await TaskService.findAll());
  };

  const done = async (task) => {
    await TaskService.updateById(task);
    await getAll() 
  };

  const addTask = async () => {
    await TaskService.addTask(task); 
    await getAll();
    setTask('');
    Keyboard.dismiss();
  };

  const excluir = async (id) => { 
    TaskService.removeTask(id)
    console.log('excluiu');
    await getAll()
  };

  const cancel = () => {
    setTask('');
  };

  let cancelar = 'Cancelar';
  let salvar = 'Salvar';
  let title = 'Lista de tarefas';

  return (
    <View style={style.container}>
      <View style={style.inputBox}>
        <TextInput style={style.input} value={task} onChangeText={setTask} />
        <View style={style.buttonBox}>
          <Pressable style={style.buttonCancel} onPress={cancel}>
            <Text>{cancelar}</Text>
          </Pressable>
          <Pressable style={style.buttonSave} onPress={addTask}>
            <Text>{salvar}</Text>
          </Pressable>
        </View>
      </View>
      <Text style={style.title}>{title}</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => done(item)}
            style={style.button}
            onLongPress={() => excluir(item.id)}>
            <Text style={item.feito ? style.itemThrough : style.item}>
              {item.descricao}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginStart: 16,
    marginTop: 90,
  },
  title: {
    fontSize: 36,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  item: {
    paddingBottom: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  itemThrough: {
    paddingBottom: 10,
    textDecorationLine: 'line-through',
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    borderBottomColor: '#cecece',
    borderTopColor: 'white',
    borderStartColor: 'white',
    borderEndColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#cecece',
    height: 'wrap-content',
    marginEnd: 16,
    elevation: 7,
    borderRadius: 10,
  },
  input: {
    maxHeight: 35,
    height: 35,
    borderWidth: 1,
    margin: 16,
    marginHorizontal: 16,
    paddingStart: 5,
    fontSize: 24,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonCancel: {
    backgroundColor: '#ff6961',
    padding: 10,
    marginBottom: 20,
  },
  buttonSave: {
    backgroundColor: '#55c2da',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
});
