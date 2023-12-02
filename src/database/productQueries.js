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
    console.log(productData);
    
    const { data, error } = await supabase.from('Product').insert([productData]);

    if (error)
        console.log(error);

    return { data, error };
};


const getProductsCount = async () =>
{
    const { count } = await supabase.from('Product').select('*', { count: 'exact', head: true });

    return count;
};




module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductsCount
};
