import React, { useState, useEffect, Fragment } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

function useQuote() {
  const [quote, setQuote] = useState(null)
  var [count,setCount] = useState(0);

  useEffect(() => {
    updateQuote()
  }, [])

  function updateQuote() {
    fetch("http://localhost:3000/quotes")
      .then((response) => response.json())
      .then((quotes) => {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        setQuote(quotes[randomIndex])
      })
  }
  function updatecoun(){
    setCount(count +1)
  }
  

  return { quote,count, updateQuote,updatecoun }
}

export default function App() {
  const { quote, updateQuote ,count,updatecoun} = useQuote()
  return (
    <View style={styles.container}>
      {quote && (
        <Fragment>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
      <Button  onPress={updateQuote} onPress={updatecoun} title= "Show Me Another Quote!" />
      <Text style={styles.quoteAuthor}>Quotes Visted {count}</Text>
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#80bfff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  quoteText: {
    textAlign: "center",
    fontSize: 28,
  },
  quoteAuthor: {
    fontSize: 18,
    marginTop: 25,
  },
})
