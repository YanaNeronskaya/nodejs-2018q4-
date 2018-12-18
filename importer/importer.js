const csv = require('csvjson');
const fs = require('fs');
import emitter from '../emitter'

class Importer {
    init(){
        emitter.subscribe('dirwatcher:changed', ({path}) => {
            fs.readdir(path, (err, files) => {
                if(files) {
                    files.forEach( fileName => {
                        if(fileName) {
                            console.log(this.import(path+'/'+fileName).then(data => {
                                return data
                            }));

                            console.log(this.importSync(path+'/'+fileName));
                        }
                    });
                }
            });
        });
    }

    import(path) {
        return new Promise( (resolve, reject) => {
            const data = fs.readFileSync(path, { encoding : 'utf8'});
            if(data) {
                resolve(csv.toObject(data))
            } else (
                reject('No data :(')
            )
        })
    }

    importSync(path){
        const data = fs.readFileSync(path, { encoding : 'utf8'});
        return csv.toObject(data);
    }
}

export default Importer;