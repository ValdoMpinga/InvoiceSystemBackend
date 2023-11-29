const supabase = require('./supabase');

const getAllCustomers = async () =>
{
    const { data, error } = await supabase.from('Customer').select('*');
    return { data, error };
};

const getCustomerByEmail = async (customerEmail) =>
{
    const { data } = await supabase.from('Customer').select('*').eq('email', customerEmail);

    return data[0]
};

const getCustomerById = async (customerId) =>
{
    const { data } = await supabase.from('Customer').select('*').eq('id', customerId);

    return data[0]
};

const createCustomer = async (customerData) =>
{
    const { data, error } = await supabase.from('Customer').insert([customerData]);
    return { data, error };
};


module.exports = {
    getAllCustomers,
    getCustomerByEmail,
    createCustomer,
    getCustomerById
};
