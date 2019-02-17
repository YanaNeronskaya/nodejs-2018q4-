const through2 = require('through2');
const minimist = require('minimist');
const path = require('path');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const helpMsg = `Available actions with parameters for process input or specified files:\n
    --action, -a       Action to be performed
    --file, -f         File to be processed
    --path, -p         Path to a folder containing css files
    --help, -h         Show this help message again.\n`;

const aliasConf = {
    'help': 'h',
    'action': 'a',
    'file': 'f',
    'path': 'p',
};

/** Reverse input text */
const reverse = () => {
    console.log('Type to reverse:');
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.reverse().slice(1));
            this.push('\n');
            next();
        }))
        .pipe(process.stdout);
};

/** Transform input text to Uppercase */
const transform = () => {
    console.log('Type to trasform:');
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.toString().toUpperCase());
            next();
        }))
        .pipe(process.stdout);
};

const outputFile = (filePath) => {
    console.log(`Output file: ${filePath}`);
    fs.createReadStream(filePath).pipe(process.stdout);
};

/** Converts from file with added filepath */
const convertFromFile = (filePath) => {
    console.log(`Convert from file: ${filePath}`);
    fs.createReadStream(filePath)
        .pipe(through2(function (chunk, encoding, next) {
            const jsonTxt = JSON.stringify(parse(chunk.toString(), {
                skip_empty_lines: true,
                columns: true
            }));

            this.push(jsonTxt);

            next();
        }))
        .pipe(process.stdout);
};

/** Converts to file with added filepath */
const convertToFile = (filePath) => {
    const baseName = path.basename(filePath, 'csv').slice(0, -1);
    const pathName = path.dirname(filePath);
    const writeStream = fs.createWriteStream(`${pathName}/${baseName}.json`);

    fs.createReadStream(filePath)
        .pipe(through2(function (chunk, enc, next) {
            const jsonTxt = JSON.stringify(parse(chunk.toString(), {
                columns: true,
                skip_empty_lines: true,
            })).replace(/\s/g, '');

            this.push(jsonTxt);

            next();
        }))
        .pipe(writeStream);

    writeStream.on('finish', () => console.log(`${baseName} json has been created!`));
};

/** Creates CSS Bundle */
const createBundle = (directoryPath) => {
    const baseName = path.basename(directoryPath);
    const pathName = path.dirname(directoryPath);
    const writeStream = fs.createWriteStream(`${pathName}/${baseName}/bundle.css`);
    const dirFiles = fs.readdirSync(directoryPath);

    dirFiles.map( file => {
        fs.createReadStream(`${pathName}/${baseName}/${file}`)
            .pipe(through2(function (chunk, enc, next) {
                this.push(chunk.toString());
                next();
            }))
            .pipe(writeStream);
    });

    writeStream.on('finish', () => console.log(`${directoryPath} CSS Bundle has been created!`));
};

/** Returns object with options and arguments */
const getMinArgs = () => {
    const args = process.argv.slice(2);
    const minArgs = minimist(
        args,
        { alias: aliasConf }
    );
    const keys = Object.keys(keys);

    keys.forEach(key => delete minArgs[aliasConf[key]]);

    return minArgs;
};

(function streamStart() {
    const args = getMinArgs();
    const opts = Object.keys(args);

    if (opts.length === 1) {
        console.error('Incorrect. Please, add options.');
        console.log(helpMsg);
    } else if (opts.indexOf('help') === 1) {
        console.log(helpMsg);
    } else if (opts.indexOf('action') === 1) {
        switch (args.action) {
            case 'reverse':
                reverse();
                break;
            case 'transform':
                transform();
                break;
            case 'outputFile':
                if (args.file) {
                    outputFile(args.file);
                } else {
                    console.error('File path was not found.');
                }
                break;
            case 'convertFromFile':
                if (args.file) {
                    convertFromFile(args.file);
                } else {
                    console.error('File path was not found.');
                }
                break;
            case 'convertToFile':
                if (args.file) {
                    convertToFile(args.file);
                } else {
                    console.error('File path was not found.');
                }
                break;
            case 'cssBundler':
                if (args.path) {
                    createBundle(args.path);
                } else {
                    console.error('File path was not found.');
                }
                break;
            default:
                console.error('Error! Invalid action!');
        }
    } else {
        console.error('Invalid options!');
    }
})();
