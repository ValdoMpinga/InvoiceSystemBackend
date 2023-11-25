const supabase = require('./supabase');

const getAllCustomers = async () =>
{
    const { data, error } = await supabase.from('Customer').select('*');
    return { data, error };
};

const getCustomerById = async (customerId) =>
{
    const { data } = await supabase.from('Customer').select('*').eq('id', customerId);
    console.log(data);
    return data
};

const createCustomer = async (customerData) =>
{
    const { data, error } = await supabase.from('Customer').insert([customerData]);
    return { data, error };
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    // Add other customer-related queries here if needed
};
