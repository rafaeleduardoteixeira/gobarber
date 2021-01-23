import React from 'react';
import SignIn from './pages/SignIn/index';
// import SignUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';
import AppProvider from './context/index';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </div>
  );
};

export default App;
