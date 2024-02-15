import axios from 'axios';

class QuoteService{
    public async get(){
        let response =  await axios.get('https://stoic.tekloon.net/stoic-quote');
        return response;
    }
}

const quoteService = new QuoteService();
export default quoteService;