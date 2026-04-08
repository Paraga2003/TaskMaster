import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from '@clerk/clerk-react';

import Dashboard from './pages/Dashboard';
import { AuthPage } from './pages/AuthPage';


const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    
      
        <Routes>
          
          <Route 
            path="/login" 
            element={<AuthPage mode="signin" />} 
          />
          <Route 
            path="/signup" 
            element={<AuthPage mode="signup" />} 
          />

          
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      
    
  );
}

export default App;