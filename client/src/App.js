import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { value: '' };
        this.updateState = this.updateState.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    queryRequest = async (query) => {
        const searchPath = '/api/search';
        const response = await fetch(searchPath, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type" : "application/json" },
            body: JSON.stringify(query)
        });

        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    updateState(event) {
        this.setState({
            value: event.target.value
        });
        event.preventDefault();
    }

    submitRequest(event){
        this.queryRequest(this.state.value).then((res) => {
           console.log(res);
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.submitRequest}>
                <label>
                    <input type="text"
                           placeholder="Begin your search. . ."
                           value={this.state.value}
                           onChange={this.updateState}
                           autoFocus
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default App;