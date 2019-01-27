import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Button, Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

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

        // Need to clear the details-container upon new search to prevent UI 'bug'
        ReactDOM.render(<div></div>, document.getElementById('details-container'));
    }

    showDetails(event){
        console.log('event is:', event);
        console.log('needing info for: ', event.target.value);

        const desiredTitleName = event.target.value;
        const data = this.state.lastResult;
        for (let i = 0; i < data.length; i++){
            if (data[i].TitleName === desiredTitleName){
                const found = data[i];
                console.log('thissun found', found);
                ReactDOM.render(
                    <Row id="resultsRow">
                        <Col sm={10} md={8} lg={6}>
                            <h4>{found.TitleName} ({found.ReleaseYear})</h4>
                            <p>{found.Storylines[0].Description}</p>
                            <h5>Starring: {found.Participants[0].Name}, {found.Participants[1].Name}, {found.Participants[2].Name}</h5>
                            <ul></ul>
                        </Col>
                    </Row>,
                    document.getElementById('details-container')
                );
            }
        }
    }

    renderResults(results){
        this.setState({ lastResult : results });

        let titleList = [];
        for (let i = 0; i < results.length; i++){
            titleList.push(results[i].TitleName);
        }

        let itemMap = titleList.map((title, i) =>
            <Col key={i} sm={6} md={3}>
                <Button className="buttonSet" key={i} onClick={this.showDetails} value={title}>
                    {title}
                </Button>
            </Col>
        );

        ReactDOM.render(
            <div id="results">
                <h5>
                    Your Search Results (click a result to view additional details):
                </h5>
                {itemMap}
            </div>,
            document.getElementById('results-container')
        )

    }

    render() {
        return (
            <header>
                <h4>Movie SuperSearch</h4>
                <form onSubmit={this.submitRequest}>
                        <label>
                            <input id="search-box"
                                   type="text"
                                   placeholder="Begin your search. . ."
                                   value={this.state.value}
                                   onChange={this.updateState}
                                   autoFocus
                            />
                            <Button id="search-btn" bsStyle="primary" value="Submit" type="submit" >
                                Search
                            </Button>
                        </label>

                    </form>
            </header>
        );
    }
}

export default App;