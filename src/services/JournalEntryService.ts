import JournalEntryModel from "../models/JournalEntry/journalEntryModel";
import http from './httpService';

class JournalEntryService{
    public async create(input: JournalEntryModel){
        let result = await http.post('JournalEntries/create', input)
        return result.data
    }
    public async update(input: JournalEntryModel, id: number){
        let result = await http.put(`JournalEntries/${id}`,input)
        return result
    }
    public async getTodays(){
        let result = await http.get('JournalEntries/today')
        return result;
    }
    public async get(){

    }

    public async getAll() {

    }

    public async delete(){

    }
}

const journalEntryService = new JournalEntryService();

export default journalEntryService;