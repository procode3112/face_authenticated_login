import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import SignedInPage from './NextPage';
import Unauthorized from './Unauthenticated';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="SignedIn" element={<SignedInPage />} />
          <Route path="Unidentified" element={<Unauthorized />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;