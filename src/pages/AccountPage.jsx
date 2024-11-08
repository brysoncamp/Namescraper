import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports'; 

import Topbar from '../components/Topbar';
import Search from '../components/Search';

Amplify.configure(awsconfig);


const AccountPage = () => (
  <div className="center-vertically">
    <Topbar />
   
    <Authenticator socialProviders={['google']}>
      {({ signOut, user }) => (
        <div>
          <h2>Welcome to NameScraper</h2>
          <p>Signed in as: {user?.username}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  </div>
);

export default AccountPage;
