import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginComponent from './src/components/authentication/LoginComponent';
import RegisterComponent from './src/components/authentication/RegisterComponent';
import ChatListComponent from './src/components/chat-list/ChatListComponent';
import MessengerComponent from './src/components/messenger/MessengerComponent';

const MainNavigator = createStackNavigator({
    LoginComponent: { screen: LoginComponent },
    RegisterComponent: { screen: RegisterComponent },
    MessengerComponent: { screen: MessengerComponent },
    ChatListComponent: { screen: ChatListComponent }
});

const App = createAppContainer(MainNavigator);

export default App;
