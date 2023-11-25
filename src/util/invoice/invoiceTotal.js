
function invoiceTotal(products)
{
    if (!Array.isArray(products))
    {
        throw new Error('Input must be an array of products');
    }
    console.log(products);

    // Calculate the total amount by summing the product of quantity and price for each item
    const totalAmount = products.reduce((total, product) =>
    {
        const itemTotal = product.quantity * product.price;
        return total + itemTotal;
    }, 0);

    return totalAmount;
}

module.exports = {
    invoiceTotal,
};
