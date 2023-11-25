const supabase = require('./supabase');

const getAllInvoiceLines = async () =>
{
    const { data, error } = await supabase.from('Invoice_Line').select('*');
    return { data, error };
};

const getInvoiceLineById = async (invoiceId) =>
{
    const { data } = await supabase.from('Invoice_Line').select('*').eq('invoice_id', invoiceId);
    return data
};

const createInvoiceLine = async (invoiceLineData) =>
{
    const { data, error } = await supabase.from('Invoice_Line').insert([invoiceLineData]);

    if (error)
        console.log(error);
    return { data, error };
};

module.exports = {
    getAllInvoiceLines,
    getInvoiceLineById,
    createInvoiceLine,
};
