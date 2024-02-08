import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      randomQuote: null,
    };
  }

  componentDidMount() {
    this.refreshQuotes();
  }

  async refreshQuotes() {
    fetch('http://34.142.63.72:80/api/quoteapp/get-quotes')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ quotes: data });
      });
  }

  async addQuote(quoteText) {
    const data = new FormData();
    data.append('newQuotes', quoteText);

    fetch('http://35.246.88.118:80/api/quoteapp/add-quote', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        this.refreshQuotes();
        window.location.reload();
      });
  }

  async deleteQuote(id) {
    fetch('http://34.89.125.191:80/api/quoteapp/delete-quote' + `?id=${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        this.refreshQuotes();
        window.location.reload();
      });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newQuote = document.getElementById('newQuotes').value;
      if (newQuote) {
        this.addQuote(newQuote);
      }
    }
  };

  render() {
    const { quotes, randomQuote } = this.state;
    return (
      <div className="App">
        <h1>Quote of the Day App</h1>
        <div className="left-panel">
          <input
            id="newQuotes"
            className='quote-input'
            onKeyPress={this.handleKeyPress}
            placeholder="Enter your quote and press Enter"
          />
          {quotes.map((quote) => (
            <p key={quote.id}>
              <button onClick={() => this.deleteQuote(quote.id)}>X</button>
              <b> {quote.item}</b>&nbsp;
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;