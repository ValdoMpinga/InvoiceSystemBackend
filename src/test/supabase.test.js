// test/supabase.test.js

const { expect } = require('chai');
const supabase = require('../database/supabase'); // adjust the path based on your project structure

describe('Supabase Connection', () =>
{
    it('should successfully connect to Supabase', async () =>
    {
        try
        {
            // Use the supabase object to interact with Supabase (e.g., fetching data)
            const { data, error } = await supabase.from('Customer').select('*');

            console.log(data);
            // Assert that there is no error and data is returned
            expect(error).to.be.null;
            expect(data).to.exist;

            // You can add more specific assertions based on your actual use case
        } catch (error)
        {
            // If an error occurs during the test, fail the test
            throw new Error(`Test failed with error: ${error.message}`);
        }
    });
});
