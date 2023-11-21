const supabase = require('./supabase');

const getAllProducts = async () =>
{
    const { data, error } = await supabase.from('Product').select('*');
    return { data, error };
};

const getProductById = async (productId) =>
{
    const { data, error } = await supabase.from('Product').select('*').eq('id', productId);
    return { data, error };
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
    // Add other product-related queries here if needed
};
