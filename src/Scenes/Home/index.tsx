import { Card, Row, Col, Result, Button } from 'antd';
// import {useAuth} from '../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import quoteService from '../../services/QuoteService';
import { SmileOutlined } from '@ant-design/icons';
import './index.css'

function HomePage() {
    // const {isLoggedIn} = useAuth();
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

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

        fetchQuote();
    }, []);

    return ( 
    <>
        <Row gutter={16}>
        <Col span={12}>
            <Card className='card'>
            <Result
                icon={<SmileOutlined />}
                title="Great job at journaling, keep it up!"
                extra={<Button type="primary">Update</Button>}
            />
            </Card> 
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
 