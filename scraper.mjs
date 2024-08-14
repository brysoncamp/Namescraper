import axios from 'axios';
import { parseString } from 'xml2js';
import dotenv from 'dotenv';

dotenv.config();

const url = 'https://api.sandbox.namecheap.com/xml.response';
const domains = ['example.com', 'example.net', 'example.org'];
const domainList = domains.join(',');

const apiKey = process.env.NAMECHEAP_API_KEY;
const user = process.env.NAMECHEAP_USER;
const clientIp = process.env.CLIENT_IP;

const params = {
    ApiUser: user,
    ApiKey: apiKey,
    UserName: user,
    Command: 'namecheap.domains.check',
    ClientIp: clientIp,
    DomainList: domainList
};

const query = new URLSearchParams(params).toString();

const fullUrl = `${url}?${query}`;

axios.get(fullUrl)
    .then(response => {
        parseString(response.data, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return;
            }

            const domainResults = result.ApiResponse.CommandResponse[0].DomainCheckResult;
            const domains = domainResults.map(domain => ({
                name: domain.$.Domain,
                available: domain.$.Available === 'true',
                isPremium: domain.$.IsPremiumName === 'true',
                premiumRegistrationPrice: domain.$.PremiumRegistrationPrice
            }));

            console.log(domains);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });