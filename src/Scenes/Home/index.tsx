import { Card } from 'antd';
import {useAuth} from '../../contexts/AuthContext'

function HomePage() {
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const logIn = (e:Event) => {
        e.preventDefault()
        setIsLoggedIn(true);
    }

    const logOut = (e:Event) => {
        e.preventDefault()
        setIsLoggedIn(false);
    }
    return ( 
    <Card>
        <h1>HomePage</h1>
        <button onClick={(e:any)=>logIn(e)}>login</button>
        <button onClick={(e:any)=>logOut(e)}>log out</button>
        <span>{isLoggedIn ? 'logged in' : 'logged out'}</span>
    </Card> 
    );
}

export default HomePage;
 