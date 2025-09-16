import { useState } from 'react'
import './App.css'

const App = () => {
  return (
    <>
      <h1>Random Quote Machine</h1>
      <QuoteBox />
    </>
  )
}

const quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    author: "Marilyn Monroe"
  },
  {
    text: "So many books, so little time.",
    author: "Frank Zappa"
  },
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero"
  },
  {
    text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    author: "Bernard M. Baruch"
  }
]

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}

const QuoteBox = () => {
  const [quote, setQuote] = useState(getRandomQuote())

  return (
    <div id="quote-box">
      <p id="text">"{quote.text}"</p>
      <p id="author">- {quote.author}</p>
      <button
        id="new-quote"
        onClick={() => setQuote(getRandomQuote())}
      >
        New Quote
      </button>
      <a
        id="tweet-quote"
        href="https://twitter.com/intent/tweet"
        target="_blank"
      >
        Tweet Quote
      </a>
    </div>
  )
}

export default App
