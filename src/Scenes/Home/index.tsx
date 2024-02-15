import { Card, Row, Col, Result, Button } from 'antd';
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchQuote = async () => {
            
            try {
                let result = await quoteService.get();
                console.log(result.data);
                setQuote(result.data.quote)
                setAuthor(result.data.author)
            } catch (err) {
                console.error('no quote', err);
                
            }
        };
        const fetchTodaysJournalEntry = async () => {
            try {
                //setLoading(true);
                let result = await journalEntryService.getTodays();
                setIsEntrySubmittedToday(true)
                console.log(result)
                // setLoading(false);
            } catch (err) {
                console.error('Failed to fetch today\'s journal entry:', err);
                setIsEntrySubmittedToday(false)
                // setLoading(false);
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
                <div style={{display:"flex"}}><h3>{quote}</h3></div>
                <div style={{display:"flex", justifyContent:"end"}}><h3>-{author}</h3></div>
            </Card> 
        </Col>
        </Row>
        <Row gutter={16}>
        <Col span={12}>
            <Card className='card'>
            <div style={{display:"flex"}}><h3>{quote}</h3></div>
            <div style={{display:"flex", justifyContent:"end"}}><h3>-{author}</h3></div>
            </Card> 
        </Col>
        <Col span={12}>
        <Card className='card'>
            <div style={{display:"flex"}}><h3>{quote}</h3></div>
            <div style={{display:"flex", justifyContent:"end"}}><h3>-{author}</h3></div>
            </Card> 
        </Col>
        </Row>
    </>

    );
}

export default HomePage;
 