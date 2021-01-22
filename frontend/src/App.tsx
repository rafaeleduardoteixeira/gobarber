import React from 'react';
import SignIn from './pages/SignIn/index';
// import SignUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <div className="App">
      <SignIn />
      <GlobalStyle />
    </div>
  );
};

export default App;
