import React, { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const App = () => {

  // Making Variables and their setters
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);
  const [useAns, setUseAns] = useState(false);

  // Function to handle button press
  const onButtonPress = (button) => {
    switch (button) {
      case '=':
        calculateResult();
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
        setInput(input + button);
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input); // Evaluates the string of inputs and which operation is being used
      setResult(evalResult);          // Calls setter for result text to be displayed
      setInput('');                   // Resets the input text to 'empty' and just displays result
      setUseAns(true);                // To handle ANS operation
    } catch (error) {
      setResult('Error');             // Calls setter for result text to display "Error"
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const backspace = () => {
    setInput(input.slice(0, -1));     // Erases string value of input from right to left
  };

  const handleExp = () => {
    setInput(input + 'e');
  };

  const toggleSign = () => {
    if (input.startsWith('-')) {      // If input is negative
      setInput(input.slice(1));         // Erases negative sign
    } else {
      setInput('-' + input);         // Else adds a '-' char in front of input
    }
  };

  const roundResult = () => {
    if (result) {
      const roundedResult = Math.round(result);  // Rounds off result to whole number
      setResult(roundedResult);
    }
  };

  const usePreviousResult = () => {
    if (useAns && result !== '') {            // If value of ANS and result DOES NOT equal to 'empty'
      setInput(input + result.toString());    // Sets input and adds "ANS" with value of previous result
    }
  };

  const addToMemory = () => {
    if (result) {
      setMemory(memory + parseFloat(result));
    }
  };

  const subtractFromMemory = () => {
    if (result) {
      setMemory(memory - parseFloat(result));
    }
  };

  const recallMemory = () => {
    setInput(input + memory.toString());
  };

  return (
    <SafeAreaView style = {styles.container}>
      <StatusBar style = "auto"/>

        <View style = {styles.solutionContainer}>
          <Text style = {styles.solutionText}>{result}</Text>
        </View>
        <View style = {styles.inputContainer}>
          <TextInput 
            style = {styles.inputText} 
            value = {input} 
            onChangeText={setInput} 
            keyboardType='numeric'
          />
        </View>
        <View style = {styles.buttonContainer}>
            {['7', '8', '9', '+', 'Back', '4', '5', '6', '-', 'Ans', '1', '2', '3', '*', 'M+', '0', '.', 'EXP', '/', 'M-', '±', 'RND', 'AC', '=', 'MR'].map(
              (item, index) =>(
                <TouchableOpacity 
                  key = {index} 
                  style = {styles.button}
                  onPress={()=> onButtonPress(item)}
                >
                    <Text style = {styles.buttonText}>{item}</Text>
                  </TouchableOpacity>
              )
            )}
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{  //Entire screen container
    flex:1,
  },

  solutionContainer: { //Container for the result 
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }, 

  solutionText: { //Styling for result text
    fontSize: 40
  }, 

  inputContainer: { //Container for inputs
    flex:9,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }, 

  inputText: { //Styling for input text
    fontSize: 30,
  }, 

  buttonContainer: { //Number and operations button container
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }, 

  button: { //Button size and styling
    fontSize: 24,
    width: "20%", //this adjusts columns
    height: "20%",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
  }, 

  buttonText: { // Number and operations button text styling
    fontSize: 24,
  }


})

export default App;