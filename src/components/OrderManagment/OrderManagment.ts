import { defineComponent, ref, onMounted, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Product {
  name: string;
  quantity: number;
  price: number;
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

    const orderDetails = ref<Product[]>([]);
    const originalOrderDetails = ref<Product[]>([]);
    const isEditing = ref(false);
    const isBringCalled = ref(false); // Show Bill screen state
    const totalAmount = ref(0);

    const loadOrderDetails = () => {
      const storedOrderDetails = localStorage.getItem(`order-${tableId}`);
      if (storedOrderDetails) {
        orderDetails.value = JSON.parse(storedOrderDetails);
        totalAmount.value = calculateTotalAmount(orderDetails.value);
      }
    };

    const toggleEdit = () => {
      if (isEditing.value) {
        orderDetails.value = JSON.parse(JSON.stringify(originalOrderDetails.value));
      } else {
        originalOrderDetails.value = JSON.parse(JSON.stringify(orderDetails.value));
      }
      isEditing.value = !isEditing.value;
    };

    const toggleBringBill = () => {
      if (isBringCalled.value) {
        orderDetails.value = JSON.parse(JSON.stringify(originalOrderDetails.value));
      } else {
        originalOrderDetails.value = JSON.parse(JSON.stringify(orderDetails.value));
      }
      isBringCalled.value = !isBringCalled.value;
    };

    const createOrder = () => {
      router.push({ path: '/Menu', query: { tableId } });
    };

    const increaseQuantity = (product: Product) => {
      product.quantity += 1;
    };

    const decreaseQuantity = (product: Product) => {
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else if (product.quantity === 1) {
        product.quantity = 0;
      }
    };

    const saveChanges = () => {
      localStorage.setItem(`order-${tableId}`, JSON.stringify(orderDetails.value));
      isEditing.value = false;
      loadOrderDetails();
      console.log("Changes saved successfully!");
    };

    const cancelOrder = () => {
      orderDetails.value.forEach(product => (product.quantity = 0));
      localStorage.setItem(`order-${tableId}`, JSON.stringify(orderDetails.value));
      console.log('Order has been canceled');
      loadOrderDetails();
    };

    const calculateTotalAmount = (orders: Product[]) => {
      return orders.reduce((total, product) => {
        return total + (product.quantity * product.price);
      }, 0);
    };

    const goToSeatPlan = () => {
      router.push('/SeatPlan');
    };

    const goBackToOrderManagement = () => {
      isBringCalled.value = false;
    };

    const PaymentCompleted = () => {
      orderDetails.value.forEach(product => (product.quantity = 0));
      localStorage.setItem(`order-${tableId}`, JSON.stringify(orderDetails.value));
      alert('Ödeme Tamamlandı!');
      goBackToOrderManagement();
    }

    onMounted(() => {
      loadOrderDetails();
    });

    return {
      tableId,
      orderDetails,
      createOrder,
      increaseQuantity,
      decreaseQuantity,
      saveChanges,
      cancelOrder,
      toggleEdit,
      toggleBringBill,
      isEditing,
      isBringCalled,
      totalAmount,
      goToSeatPlan,
      goBackToOrderManagement,
      PaymentCompleted,
    };
  },
});