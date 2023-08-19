const fs = require('fs');
const xml2js = require('xml2js');
const csv = require('csvtojson');
const yaml = require('js-yaml');
const ExifImage = require('exif').ExifImage;
const { fromHEIC } = require('heic-convert');

const readFile = (path) => {
    try{
        if(fs.existsSync(path)){
            return [fs.readFileSync(path, 'utf-8'), "completed"];
        }else{
            return ["file is not found", "failed"];
        }
    }catch(err){
        return [err, 'error'];
    }
}

const xmlToJson = async (data) => {
    try {
        const json = await xml2js.parseStringPromise(data);
        return [json, "completed"];
    } catch (error) {
        return [error, 'error'];
    }
}

const csvToJson = async (data) => {
    try {
        const json = await csv().fromString(data);
        return [json, "completed"];
    } catch (error) {
        return [error, 'error'];
    }
}

const yamlToJson = (data) => {
    try{
        return [yaml.load(data), "completed"];
    } catch (error) {
        return [error, 'error'];
    }
}

const getMetadata = (path, func) => {
    new ExifImage({ image: path }, func);
}


const heicConvert = async (data) => {
    try{
        return [await fromHEIC(data), "completed"];
    }catch(error){
        [error, 'error'];
    }
}

module.exports.readFile = readFile;
module.exports.xmlToJson = xmlToJson;
module.exports.csvToJson = csvToJson;
module.exports.yamlToJson = yamlToJson;
module.exports.getMetadata = getMetadata;
module.exports.heicConvert = heicConvert;