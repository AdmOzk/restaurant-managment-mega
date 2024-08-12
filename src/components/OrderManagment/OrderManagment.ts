import { defineComponent, ref, onMounted, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Product {
  name: string;
  quantity: number;
}

export default defineComponent({
  props: {
    tableId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const tableId = props.tableId || (route.params.tableId as string);

    // Initialize orderDetails as a ref
    const orderDetails = ref<Product[]>([]);

    // Load order details from localStorage
    const loadOrderDetails = () => {
      const storedOrderDetails = localStorage.getItem(`order-${tableId}`);
      if (storedOrderDetails) {
        orderDetails.value = JSON.parse(storedOrderDetails);
      }
    };

    // Save order details to localStorage
    const saveOrderDetails = () => {
      localStorage.setItem(`order-${tableId}`, JSON.stringify(orderDetails.value));
    };

    // Function to handle order creation
    const createOrder = () => {
      router.push({ path: '/Menu', query: { tableId } });
    };

    // Function to handle order update
    const updateOrder = () => {
      // Implement functionality to show current orders with + and - buttons
    };

    // Function to handle order cancellation
    const cancelOrder = () => {
      orderDetails.value = []; // Clear local orders
      saveOrderDetails(); // Save cleared order details
      console.log('Order has been canceled');
    };

    // Function to handle bringing the bill
    const bringBill = () => {
      alert('Hesap getiriliyor...');
    };

    // Load order details when the component is mounted
    onMounted(() => {
      loadOrderDetails();
    });

    return {
      tableId,
      orderDetails,
      createOrder,
      updateOrder,
      cancelOrder,
      bringBill,
    };
  },
});
