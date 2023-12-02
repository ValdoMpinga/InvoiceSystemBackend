const supabase = require('./supabase');

const getAllInvoices = async () =>
{
    const { data, error } = await supabase.from('Invoice').select('*');
    return data
};

const getInvoiceById = async (invoiceId) =>
{
    const { data, error } = await supabase.from('Invoice').select('*').eq('id', invoiceId);

    return data[0];
};

const getNumberOfInvoicesByCustomerId = async (customerId) =>
{
    const { data, error } = await supabase
        .from('Invoice')
        .select('*')
        .eq('customer_id', customerId);
    
    if (error)
    {
        console.error(error);
        return 0;
    }

    const invoicesForCustomer = data.filter((invoice) => invoice.customer_id === customerId);
    const numberOfInvoices = invoicesForCustomer.length;

    return numberOfInvoices;
};


const createInvoice = async (invoiceData) =>
{
    try
    {
        const { data, error } = await supabase.from('Invoice').insert([invoiceData]).select();

        return data[0].id
    } catch (error)
    {
        console.error(error);
        return error
    }
};

const getInvoicesCount = async () =>
{
    const { count } = await supabase.from('Invoice').select('*', { count: 'exact', head: true });

    return count;
};




module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    getNumberOfInvoicesByCustomerId,
    getInvoicesCount
};
