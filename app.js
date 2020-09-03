import React, { useState, useEffect, Fragment } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

function useQuote() {
  const [quote, setQuote] = useState(null)

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

  return { quote, updateQuote }
}

export default function App() {
  const { quote, updateQuote } = useQuote()

  return (
    <View style={styles.container}>
      {quote && (
        <Fragment>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
          <Button onPress={updateQuote} title="Quote!" />
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
