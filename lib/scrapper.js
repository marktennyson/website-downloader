import scrape from 'website-scraper';

export default class Scrapper{
    constructor(url){
        this.dirBase = 'bucket/dirs/';
        this.givenUrl = url;
        this.googleDns = "https://dns.google/resolve?name=";
        this.url = "https://"+this.givenUrl;
        this.outDir = './'+this.dirBase+this.givenUrl;
        this.options = {
            urls: [this.url,],
            recursive: true,
            prettifyUrls: true,
            maxDepth: 1,
            filenameGenerator: 'bySiteStructure',
            directory: this.outDir,
            urlFilter: function (url) {
                console.log(url);
                return true;
            },
        }
    }
    is_valid_url = function(){
        return new Promise((resolve, reject)=>{
            const dnsUrl = this.googleDns + this.givenUrl
            fetch(dnsUrl).then(res=>res.json()).then(resp=>{
                if (resp.Answer){resolve({is_url_valid:true});}
                else {resolve({is_url_valid:false});}
            }).catch(err=>{reject(err);})
        })
    }
    download = function(){
        return new Promise((resolve, reject) => {
            scrape(this.options).then((result) => {
                if (result.code === 'ENOTFOUND'){
                    reject({message:'website downloaded failed', is:false})}
                else {resolve({message:'website downloaded success', is:true})}
            }).catch((error) => {reject(error)});
        })
    }
}