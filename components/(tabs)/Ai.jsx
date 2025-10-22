async function getGeminiResponse(userInput) {
  const strictPrompt = `
You are a knowledgeable assistant who only answers questions related to Hindu scriptures such as:
- The Ramayana
- The Mahabharata
- The Bhagavad Gita
- The Vedas
- The Upanishads
- Other related Hindu philosophies

If the user's question is related to these topics, give a detailed, friendly answer.

If not, politely respond: "I can only answer questions related to Hindu scriptures like the Ramayana, Gita, and Vedas."
`;
  const fullPrompt = `${strictPrompt}\n\nUser: ${userInput}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const requestBody = {
    contents: [{ parts: [{ text: fullPrompt }] }],
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
  } catch (error) {
    return 'Something went wrong.';
  }
}

export default function HinduAI() {
  const [userInput, setUserInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const [fullResponseText, setFullResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0];
    setUserInput(text);
    setIsListening(false);
  };

  const onSpeechError = () => {
    setIsListening(false);
  };

  const startListening = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alert('Permission to access microphone is required!');
        return;
      }
    }
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {}
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {}
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (Speech.isSpeakingAsync()) {
      Speech.stop();
    }
    const answer = await getGeminiResponse(userInput);
    setUserInput('');
    Speech.speak(answer);
    setFullResponseText(answer);
    setResponseText('');
    setLoading(false);
  };

  useEffect(() => {
    let index = 0;
    let typingTimer;
    if (fullResponseText) {
      typingTimer = setInterval(() => {
        setResponseText((prev) => {
          const next = fullResponseText.charAt(index);
          index++;
          if (index >= fullResponseText.length) {
            clearInterval(typingTimer);
          }
          return prev + next;
        });
      }, 20);
    }
    return () => clearInterval(typingTimer);
  }, [fullResponseText]);

  const handleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(fullResponseText);
      setIsSpeaking(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ask About Hindu Scriptures</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={userInput}
        onChangeText={setUserInput}
        multiline
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.micButton}
          onPress={isListening ? stopListening : startListening}
        >
          <Feather name={isListening ? 'mic-off' : 'mic'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.responseBox}>
          <TouchableOpacity style={styles.soundButton} onPress={handleSpeech}>
            {isSpeaking ? (
              <AntDesign name="sound" size={24} color="white" />
            ) : (
              <Entypo name="sound-mute" size={24} color="white" />
            )}
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.responseText}>{responseText}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#f59e0b',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#f59e0b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  micButton: {
    width: 64,
    height: 64,
    backgroundColor: '#e5e7eb',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  responseBox: {
    marginTop: 25,
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 10,
    maxHeight: 350,
    minHeight: 100,
    overflow: 'hidden',
  },
  responseText: {
    fontSize: 16,
    color: '#78350f',
  },
  soundButton: {
    width: 48,
    backgroundColor: '#374151',
    borderRadius: 24,
    padding: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
});