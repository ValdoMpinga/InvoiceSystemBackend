const supabase = require('./supabase');

const getAllInvoiceLines = async () =>
{
    const { data, error } = await supabase.from('invoice_lines').select('*');
    return { data, error };
};

const getInvoiceLineById = async (invoiceLineId) =>
{
    const { data, error } = await supabase.from('invoice_lines').select('*').eq('id', invoiceLineId);
    return { data, error };
};

const createInvoiceLine = async (invoiceLineData) =>
{
    const { data, error } = await supabase.from('invoice_lines').insert([invoiceLineData]);
    return { data, error };
};

module.exports = {
    getAllInvoiceLines,
    getInvoiceLineById,
    createInvoiceLine,
};
