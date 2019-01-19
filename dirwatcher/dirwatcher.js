const fs = require('fs');
import emitter from '../emitter';

class DirWatcher {
    constructor(){
        this.directory = null;
        this.directoryFiles = null;
    }

    watch(path, delay) {
        if(path && delay) {
            setInterval(() => {
                fs.readdir(path, (err, files) => {
                    if (!this.directoryFiles) {
                        this.directoryFiles = files;
                        this.directory = path;

                        console.log('first initialization');
                    } else {
                        for (let i = 0; i < this.directoryFiles.length; i++) {
                            if (this.directoryFiles[i] !== files[i]) {
                                if (i === this.directoryFiles.length - 1) {
                                    emitter.emit('dirwatcher:changed', {path: path});
                                }
                            } else {
                                console.log('no changes from directory')
                            }
                        }
                        this.directory = path;
                        this.directoryFiles = files;
                    }
                })
            }, delay)
        }
    }
}

export default DirWatcher;