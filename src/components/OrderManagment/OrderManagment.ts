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

    const orderDetails = ref<Product[]>([]);
    const originalOrderDetails = ref<Product[]>([]);
    const isEditing = ref(false);

    const loadOrderDetails = () => {
      const storedOrderDetails = localStorage.getItem(`order-${tableId}`);
      if (storedOrderDetails) {
        orderDetails.value = JSON.parse(storedOrderDetails);
        originalOrderDetails.value = JSON.parse(storedOrderDetails);
      }
    };

    const saveOrderDetails = () => {
      localStorage.setItem(`order-${tableId}`, JSON.stringify(orderDetails.value));
      console.log("Order details saved:", orderDetails.value);
    };

    const toggleEdit = () => {
      if (isEditing.value) {
        orderDetails.value = JSON.parse(JSON.stringify(originalOrderDetails.value));
      } else {
        originalOrderDetails.value = JSON.parse(JSON.stringify(orderDetails.value));
      }
      isEditing.value = !isEditing.value;
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
      saveOrderDetails();
      isEditing.value = false;
      loadOrderDetails(); // Aktif siparişleri güncelle
      console.log("Changes saved successfully!");
    };

    const cancelOrder = () => {
      orderDetails.value.forEach(product => (product.quantity = 0));
      saveOrderDetails();
      console.log('Order has been canceled');
      loadOrderDetails(); // Sipariş iptal edildikten sonra aktif siparişleri güncelle
    };

    const bringBill = () => {
      alert('Hesap getiriliyor...');
    };

    const goToSeatPlan = () => {
      router.push('/SeatPlan');
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
      bringBill,
      isEditing,
      toggleEdit,
      goToSeatPlan,
    };
  },
});
