import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Line } from 'rc-progress';


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            files: [],
            percent: 0
        };
        this.setPercent = this.setPercent.bind(this);
    }

    setPercent(p) {
        this.setState(function(currentState) {
            if (p >= 100) {
                return {percent: 100};
            }
            return {percent: p};
        });
    }

    onDrop = (files) => {
        this.setState({ files });
        files.forEach(f => {
            let data = new FormData();
            data.append('name', f.name);
            data.append('file', f);
            axios.post('/upload', data, {
                onUploadProgress: progressEvent => {
                    let percent = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total );
                    this.setPercent(percent);
                }
            });
        });
    };

    render() {
        return (
            <section>
                <div className="app-upload">
                    <Dropzone id="file" onDrop={this.onDrop.bind(this)}>
                        <p>Drag and drop files here.</p>
                        <p>Percent Uploaded: {this.state.percent}</p>
                        <Line percent={this.state.percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' />
                    </Dropzone>
                </div>
                <aside>
                    <h4 className="app-upload">Dropped files: </h4>
                    <ul className="app-upload">
                        {
                            this.state.files.map(
                                f => <li key={f.name}>{f.name} - {f.size} bytes</li>
                            )
                        }
                    </ul>
                </aside>
            </section>
        )
    }
}

export default Upload;
