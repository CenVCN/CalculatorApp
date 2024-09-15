import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);
  const [useAns, setUseAns] = useState(false);
  const [isLandscape, setIsLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height);

  const handleOrientationChange = ({ window }) => {
    setIsLandscape(window.width > window.height);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  const onButtonPress = (button) => {
    switch (button) {
      case '=':
        setUseAns(true);
        setInput('');
        break;
      case 'AC':
        clearInput();
        break;
      case 'Back':
        backspace();
        break;
      case 'EXP':
        handleExp();
        break;
      case '±':
        toggleSign();
        break;
      case 'RND':
        roundResult();
        break;
      case 'Ans':
        usePreviousResult();
        break;
      case 'M+':
        addToMemory();
        break;
      case 'M-':
        subtractFromMemory();
        break;
      case 'MR':
        recallMemory();
        break;
      default:
        setInput(prevInput => prevInput + button);
    }
  };

  useEffect(() => {
    try {
      if (input) {
        const evalResult = eval(input);
        setResult(evalResult.toString());
      }
    } catch (error) {
      setResult('Error');
    }
  }, [input]);

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput(prevInput => prevInput.slice(0, -1));
  };

  const handleExp = () => {
    setInput(prevInput => prevInput + 'e');
  };

  const toggleSign = () => {
    setInput(prevInput => prevInput.startsWith('-') ? prevInput.slice(1) : '-' + prevInput);
  };

  const roundResult = () => {
    if (result) {
      const roundedResult = Math.round(parseFloat(result));
      setResult(roundedResult.toString());
    }
  };

  const usePreviousResult = () => {
    if (useAns && result !== '') {
      setInput(prevInput => prevInput + result);
    }
  };

  const addToMemory = () => {
    if (result) {
      setMemory(prevMemory => prevMemory + parseFloat(result));
    }
  };

  const subtractFromMemory = () => {
    if (result) {
      setMemory(prevMemory => prevMemory - parseFloat(result));
    }
  };

  const recallMemory = () => {
    setInput(prevInput => prevInput + memory.toString());
  };

  const rows = [
    ['7', '8', '9', '+', 'Back'],
    ['4', '5', '6', '-', 'Ans'],
    ['1', '2', '3', '*', 'M+'],
    ['0', '.', 'EXP', '/', 'M-'],
    ['±', 'RND', 'AC', '=', 'MR']
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <View style={styles.displayContainerLandscape}>
            <TextInput 
              style={styles.inputText} 
              value={input} 
              onChangeText={setInput} 
              keyboardType='numeric'
            />
            <Text style={styles.solutionText}>{result}</Text>
          </View>
          <View style={styles.buttonContainerLandscape}>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.buttonRow}>
                {row.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.button, item.match(/[0-9]/) ? styles.numberButton : null]} 
                    onPress={() => onButtonPress(item)}
                  >
                    <Text style={styles.buttonText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.portraitContainer}>
          <View style={styles.displayContainer}>
            <TextInput 
              style={styles.inputText} 
              value={input} 
              onChangeText={setInput} 
              keyboardType='numeric'
            />
            <Text style={styles.solutionText}>{result}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.buttonRow}>
                {row.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.button, item.match(/[0-9]/) ? styles.numberButton : null]} 
                    onPress={() => onButtonPress(item)}
                  >
                    <Text style={styles.buttonText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  portraitContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },

  displayContainerLandscape: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },

  inputText: {
    fontSize: 30,
    color: '#c7c7c7',
    width: '100%',
    textAlign: 'right',
  },

  solutionText: {
    fontSize: 65,
    color: '#000',
    textAlign: 'right',
  },

  buttonContainer: {
    flex: 3,
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'flex-end',
  },

  buttonContainerLandscape: {
    flex: 2,
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'flex-end',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  button: {
    fontSize: 18,
    width: '18%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#70FFC6',
  },

  numberButton: {
    backgroundColor: '#e6e6e6',
  },

  buttonText: {
    fontSize: 16,
  }
});

export default App;
