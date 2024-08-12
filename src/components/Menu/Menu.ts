import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Product {
  name: string;
  quantity: number;
  price: number; // Ensure this property is included
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const tableId = route.query.tableId as string;

    // Static menu items
    const menuProducts: Product[] = [
      { name: 'Cheeseburger', quantity: 0, price: 35.00 },
      { name: 'Margherita Pizza', quantity: 0, price: 45.00 },
      { name: 'Caesar Salad', quantity: 0, price: 25.00 },
      { name: 'Pasta Carbonara', quantity: 0, price: 40.00 },
    ];

    const products = ref<Product[]>(menuProducts);

    const loadProducts = () => {
      const storedProducts = localStorage.getItem(`order-${tableId}`);
      if (storedProducts) {
        const storedProductsArray = JSON.parse(storedProducts) as Product[];
        // Update products with the quantities from local storage
        products.value.forEach(product => {
          const storedProduct = storedProductsArray.find(p => p.name === product.name);
          if (storedProduct) {
            product.quantity = storedProduct.quantity;
          }
        });
      }
    };

    const saveProducts = () => {
      localStorage.setItem(`order-${tableId}`, JSON.stringify(products.value));
    };

    onMounted(() => {
      loadProducts();
    });

    const addProductToOrder = (product: Product) => {
      const existingProduct = products.value.find(p => p.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        products.value.push({ ...product, quantity: 1 });
      }
      saveProducts();
    };

    const removeProductFromOrder = (product: Product) => {
      const existingProduct = products.value.find(p => p.name === product.name);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else if (existingProduct.quantity === 1) {
          // Keep the product with quantity 0
          existingProduct.quantity = 0;
        }
        saveProducts();
      }
    };

    return {
      tableId,
      products,
      addProductToOrder,
      removeProductFromOrder,
    };
  },
});