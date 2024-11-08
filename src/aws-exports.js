const awsconfig = {
    Auth: {
        Cognito: { 
            region: 'us-east-1',
            userPoolId: 'us-east-1_ytQSVqVL5',
            userPoolClientId: '5krg23arijlt1ntib5hf1ff298',
            mandatorySignIn: true,
            loginWith: {
                oauth: {
                    domain: 'namescraper.auth.us-east-1.amazoncognito.com',
                    scopes: ['profile email openid'],
                    redirectSignIn: ['http://localhost:5173/auth'],
                    redirectSignOut: ['https://namescraper.com/auth'],
                    responseType: 'code',
                },
                email: true,
                phone_number: false,
                username: false
            }
        }
    }
};

export default awsconfig;
