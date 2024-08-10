import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tableId: {
      type: String,
      required: true,
    },
  },
  methods: {
    createOrder() {
      alert(`Creating order for Table ${this.tableId}`);
    },
    updateOrder() {
      alert(`Updating order for Table ${this.tableId}`);
    },
    cancelOrder() {
      alert(`Cancelling order for Table ${this.tableId}`);
    },
    bringBill() {
      alert(`Bringing bill for Table ${this.tableId}`);
    },
  },
});
