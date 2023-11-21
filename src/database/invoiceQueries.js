const supabase = require('./supabase');

const getAllInvoices = async () =>
{
    const { data, error } = await supabase.from('invoices').select('*');
    return { data, error };
};

const getInvoiceById = async (invoiceId) =>
{
    const { data, error } = await supabase.from('invoices').select('*').eq('id', invoiceId);
    return { data, error };
};

const createInvoice = async (invoiceData) =>
{
    const { data, error } = await supabase.from('invoices').insert([invoiceData]);
    return { data, error };
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    // Add other invoice-related queries here if needed
};
