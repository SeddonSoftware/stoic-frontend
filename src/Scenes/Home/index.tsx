import { Card, Row, Col, Spin } from 'antd';
import {useAuth} from '../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import quoteService from '../../services/QuoteService';
import DailyStatusCard from '../../components/DailyStatusCard';
import './index.css'
import journalEntryService from '../../services/JournalEntryService';

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
                console.log(result.data);
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
                    console.log(result)
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

    return ( 
    <>
        <Row gutter={16}>
        <Col span={12}>
            <DailyStatusCard isLoggedIn={isLoggedIn} isEntrySubmittedToday={isEntrySubmittedToday} />
        </Col>
        <Col span={12}>
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
        </Col>
        </Row>
    </>

    );
}

export default HomePage;
 