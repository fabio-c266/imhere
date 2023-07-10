import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from './styles'
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantToAdd, setParticipantToAdd] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantToAdd)) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.')
    }

    setParticipants(prevState => [...prevState, participantToAdd])
    setParticipantToAdd('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Você realmente deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState => [...prevState.filter(participant => participant !== name)])
          Alert.alert('Usuário deletado!')
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantToAdd}
          value={participantToAdd}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={item => item}
        data={participants}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )} 
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença</Text>
          )
        }}
        />
    </View>
  )
}