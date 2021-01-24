import fs from 'fs';
import config from './../creds.json'

export default class Bucket{
    constructor(){
        this.folderName = 'bucket/';
    }
    upload_item = function(item){
        return new Promise((resolve, reject) => {
            const buf = Buffer.from(item, 'base64');
            fs.open(this.folderName+item, 'w', )
        })
    }
}