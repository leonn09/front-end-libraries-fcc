import { useState } from 'react'
import { marked } from 'marked'
import './App.css'

// Default markdown text
const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`js
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

- Lists
  - Nested lists
     - With more nesting

1. Numbered list
1. Works too

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const App = () => {
  // Step 1: Store markdown in state
  const [markdown, setMarkdown] = useState(initialMarkdown)

  // Step 2: Update state on textarea change
  const handleChange = (e) => {
    setMarkdown(e.target.value)
  }

  return (
    <div className="App">
      <Editor markdown={markdown} handleChange={handleChange} />
      <Previewer markdown={markdown} />
    </div>
  )
}

// Editor component
const Editor = ({ markdown, handleChange }) => {
  return (
    <div className="editor-container">
      <h2>Editor</h2>
      <textarea
        id="editor"
        value={markdown}
        onChange={handleChange}
      />
    </div>
  )
}

// Previewer component
const Previewer = ({ markdown }) => {
  return (
    <div className="previewer-container">
      <h2>Previewer</h2>
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  )
}

export default App