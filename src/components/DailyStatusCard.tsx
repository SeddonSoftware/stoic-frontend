import { Card, Result, Button } from 'antd';
import { SmileOutlined, MehOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DailyStatusCardProps {
    isLoggedIn: boolean;
    isEntrySubmittedToday: boolean;
  }

function DailyStatusCard({isLoggedIn,isEntrySubmittedToday}:DailyStatusCardProps) {
    const navigate = useNavigate();
    const handleCLickJournal = () => {
        navigate('/journal')
    }
    const handleCLickLogin = () => {
        navigate('/login')
    }
    return ( 
        <Card className='card' type='inner' style={{padding: 50,marginTop: 15}}>
            {isLoggedIn && isEntrySubmittedToday && (
                <Result
                style={{padding: '0px !important'}}
                icon={<SmileOutlined />}
                title="Great job at journaling, keep it up!"
                extra={<Button onClick={handleCLickJournal} type="primary">Update</Button>}
            />
            )}
            {isLoggedIn && !isEntrySubmittedToday && (
                <Result
                style={{padding: '0px !important'}}
                icon={<MehOutlined />}
                title="You haven't journaled yet today. Keep up the dicipline!"
                extra={<Button onClick={handleCLickJournal} type="primary">Enter</Button>}
                />
            )}
            {!isLoggedIn && (
                <Result
                style={{padding: '0px !important'}}
                icon={<UserOutlined />}
                title="Login so you can keep up the Journaling. You got this!"
                extra={<Button onClick={handleCLickLogin} type="primary">Login</Button>}
            />
            )}

        </Card> 
     );
}

export default DailyStatusCard;