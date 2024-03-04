import { Card, Row, Col, Spin, Flex } from 'antd';
import {useAuth} from '../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import quoteService from '../../services/QuoteService';
import DailyStatusCard from '../../components/DailyStatusCard';
import './index.css'
import journalEntryService from '../../services/JournalEntryService';
import Calandar from '../../components/Calandar';

function HomePage() {
    const {isLoggedIn} = useAuth();
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isEntrySubmittedToday, setIsEntrySubmittedToday] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            
            try {
                let result = await quoteService.get();
                setQuote(result.data.quote)
                setAuthor(result.data.author)
            } catch (err) {
                console.error('no quote', err);
                setQuote("Confine yourself to the present.")
                setAuthor("Marcus Aurelius")
            }
        };
        const fetchTodaysJournalEntry = async () => {
            if(isLoggedIn){
                try {
                    let result = await journalEntryService.getTodays();
                    setIsEntrySubmittedToday(true)
                } catch (err) {
                    console.error('Failed to fetch today\'s journal entry:', err);
                    setIsEntrySubmittedToday(false)
                }
            }
        };
        setIsLoading(true);
        fetchTodaysJournalEntry();
        fetchQuote();
        setIsLoading(false);
    }, []);

    let data = [
        {
          "id": 3,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "test",
          "answer3": "test",
          "answer4": "test",
          "notes": "test",
          "entryDate": "2024-02-14T19:34:58.8436999",
          "user": null
        },
        {
          "id": 4,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "test",
          "answer3": "test",
          "answer4": "test",
          "notes": "test",
          "entryDate": "2024-02-14T19:35:35.6011948",
          "user": null
        },
        {
          "id": 5,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "test",
          "answer3": "test",
          "answer4": "test",
          "notes": "test",
          "entryDate": "2024-02-14T19:36:33.8674179",
          "user": null
        },
        {
          "id": 6,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "testa",
          "answer3": "dafssa",
          "answer4": "dfas",
          "notes": "fsd",
          "entryDate": "2024-02-14T19:37:18.056914",
          "user": null
        },
        {
          "id": 7,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "testa",
          "answer3": "dafssa",
          "answer4": "dfas",
          "notes": "fsd",
          "entryDate": "2024-02-14T19:38:12.278457",
          "user": null
        },
        {
          "id": 8,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "testa",
          "answer3": "dafssa",
          "answer4": "dfas",
          "notes": "fsd",
          "entryDate": "2024-02-14T19:38:18.380344",
          "user": null
        },
        {
          "id": 9,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "testa",
          "answer3": "dafssa",
          "answer4": "dfas",
          "notes": "fsd",
          "entryDate": "2024-02-14T19:38:41.0649471",
          "user": null
        },
        {
          "id": 10,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "string",
          "answer2": "string",
          "answer3": "string",
          "answer4": "string",
          "notes": "string",
          "entryDate": "2024-02-14T19:38:58.7478367",
          "user": null
        },
        {
          "id": 11,
          "userId": "978aa19f-30e8-4081-9b46-5a591c34c30f",
          "answer1": "test",
          "answer2": "testa",
          "answer3": "dafssa",
          "answer4": "dfas",
          "notes": "fsd",
          "entryDate": "2024-02-14T19:40:25.1432298",
          "user": null
        }
      ]

    return ( 
    <Flex justify='center' align='center' gap='middle' wrap='wrap'> 
      <Card style={{width:'80%', height: '90% !important'}}>
        <Flex justify='center' align='center' gap='middle' wrap='wrap'> 
            <DailyStatusCard isLoggedIn={isLoggedIn} isEntrySubmittedToday={isEntrySubmittedToday} />
            <Card className='card'>
            {isLoading 
            ? 
            <Spin/> 
            :
            <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <h3>{quote}</h3>
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <h3>-{author}</h3>
                </div>
            </div>
            </>
            }
            </Card> 
            {isLoggedIn  && (
              <Calandar/>
            )}
          </Flex>
      </Card> 
    </Flex>

    );
}

export default HomePage;
 