import scrape from 'website-scraper';

export default class Scrapper{
    constructor(url){
        this.givenUrl = url
        this.googleDns = "https://dns.google/resolve?name="
        this.url = "https://"+this.givenUrl;
        this.directory = './'+this.givenUrl;
        this.options = {
            urls: [this.url,],
            directory: this.directory,
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
                    reject({message:'website downloaded failed'})}
                else {resolve({message:'website downloaded success'})}
            }).catch((error) => {reject(error)});
        })
    }
}