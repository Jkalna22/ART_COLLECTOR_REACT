import React from 'react';
import { PureComponent } from 'react';


class Loading extends PureComponent {

    render() {
    return <div id="loading">
                <h2 className="message">Searching...</h2>
            </div>
    }

}

export default Loading
