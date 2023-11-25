const supabase = require('./supabase');

const getAllInvoices = async () =>
{
    const { data, error } = await supabase.from('Invoice').select('*');
    return { data, error };
};

const getInvoiceById = async (invoiceId) =>
{
    const { data, error } = await supabase.from('Invoice').select('*').eq('id', invoiceId);

    return data[0];
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





module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    // Add other invoice-related queries here if needed
};
