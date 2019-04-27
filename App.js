import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginComponent from './src/components/authentication/LoginComponent';
import ChatListComponent from './src/components/chat-list/ChatListComponent';
import MessengerComponent from './src/components/messenger/MessengerComponent';

const MainNavigator = createStackNavigator({
    MessengerComponent: {screen: MessengerComponent},
    LoginComponent: {screen: LoginComponent },
    ChatListComponent: {screen: ChatListComponent},
});

const App = createAppContainer(MainNavigator);

export default App;

