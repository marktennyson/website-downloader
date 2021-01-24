import { zip } from 'zip-a-folder';
 
export default class Zipper{
    constructor(baseFolder) {
        this.dirBase = 'bucket/dirs/';
        this.zipBase = 'bucket/zips/';
        this.baseFolder = baseFolder;
    }
    toZip = function(){
        return new Promise((resolve, reject) => {
            try{
                zip(this.dirBase+this.baseFolder, this.zipBase+this.baseFolder+'.zip');
                resolve({message:true})
            }catch(err){reject(err)}
        })
    }
}