import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
import SearchResults from "./SearchResults";

function App() {
    return (
        <React.Fragment>
            <Header />
            <SearchResults />
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.querySelector('#app-root'));