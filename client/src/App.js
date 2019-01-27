import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.makeRequest()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    makeRequest = async () => {
        const response = await fetch('/search');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movie SuperSearch</h1>
                </header>
                <p className="App-intro">{this.state.data}</p>
            </div>
        );
    }
}

export default App;