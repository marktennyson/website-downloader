import Scrapper from './../../lib/scrapper'

export default async(req, res) => {
    const url = req.query.url
    const scrapper = new Scrapper(url)
    const is_url_valid_data = await scrapper.is_valid_url()
    const is_url_valid = await is_url_valid_data.is_url_valid
    if (!is_url_valid) {res.json({message:"invalid url given."})}
    const data = await scrapper.download()
    const message = await data.message
    res.json({message: message})
  }
  