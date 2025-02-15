import React, { useState, useEffect } from 'react';

const PromotionForm = () => {
  const [formData, setFormData] = useState({
    promotionName: '',
    startDate: '',
    endDate: '',
    discountType: '',
    discountAmount: '',
    selectedProducts: []
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock products data
    setProducts([
      { id: 'prod_1', name: 'T-Shirt Basic', price: 19.99, stock: 100 },
      { id: 'prod_2', name: 'Jeans Classic', price: 49.99, stock: 50 },
      { id: 'prod_3', name: 'Sneakers Sport', price: 79.99, stock: 30 }
    ]);
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Promotion created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleProduct = (productId) => {
    setFormData(prev => {
      const selectedProducts = prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter(id => id !== productId)
        : [...prev.selectedProducts, productId];
      return { ...prev, selectedProducts };
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Create TikTok Shop Promotion</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Promotion Name</label>
            <input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Discount Type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select discount type</option>
              <option value="percentage">Percentage Off</option>
              <option value="fixed_amount">Fixed Amount Off</option>
              <option value="buy_x_get_y">Buy X Get Y</option>
              <option value="flash_sale">Flash Sale</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Discount Amount</label>
            <input
              type="number"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Select Products</label>
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : (
              <div className="max-h-60 overflow-y-auto border rounded">
                {products.map(product => (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={`p-4 border-b cursor-pointer ${
                      formData.selectedProducts.includes(product.id)
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                      <div className="text-right">
                        <div>${product.price}</div>
                        <div className="text-sm text-gray-500">Stock: {product.stock}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={formData.selectedProducts.length === 0}
          >
            Create Promotion
          </button>

          {message && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PromotionForm;
