import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Button } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { value: '' };
        this.updateState = this.updateState.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    queryRequest = async (query) => {
        const searchPath = `/api/search?q=${query}`;
        const response = await fetch(searchPath, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json" }
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
        this.queryRequest(this.state.value).then((results) => {
            this.setState({
                results: results
            });
            this.renderResults(results);
        });
        event.preventDefault();
    }

    renderResults(results){
        this.setState({ lastResult : results });

        let titleList = [];
        for (let i = 0; i < results.length; i++){
            titleList.push(results[i].TitleName);
        }

        let itemMap = titleList.map((title, i) =>
            <div key={i}>
                <Button bsStyle="primary" key={i} onClick={this.showDetails()}>{title}</Button>
            </div>
        );

        ReactDOM.render(
            <div>{itemMap}</div>,
            document.getElementById('results-container')
        )

    }

    showDetails(title){

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