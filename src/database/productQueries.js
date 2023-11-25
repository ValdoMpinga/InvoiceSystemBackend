const supabase = require('./supabase');

const getAllProducts = async () =>
{
    const { data, error } = await supabase.from('Product').select('*');
    return { data, error };
};

const getProductById = async (productId) =>
{
    const { data } = await supabase.from('Product').select('*').eq('id', productId);
    return data[0];
};

const createProduct = async (productData) =>
{
    const { data, error } = await supabase.from('Product').insert([productData]);
    return { data, error };
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
};
