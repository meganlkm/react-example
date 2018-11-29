import React, {Component} from 'react';
import Upload from './Upload';
import RunScript from './RunScript';


export default class Main extends Component {
    render() { return (
        <main>
            <Upload />
            <RunScript />
        </main>
    )}
}
