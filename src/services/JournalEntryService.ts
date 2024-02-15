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
    public async get(id: number){
        let result = await http.get(`JournalEntries/${id}`)
        return result
    }

    public async getAll() {
        let result = await http.get('JournalEntries/getAll')
        return result;
    }

    public async delete(id: number){
        let result = await http.delete(`JournalEntries/${id}`)
        return result
    }
}

const journalEntryService = new JournalEntryService();

export default journalEntryService;