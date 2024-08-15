import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SeatPlan',
  setup() {
    const router = useRouter();

    function navigateToTable(tableId: string) {
      router.push({ path: `/OrderManagment/${tableId}` });
    }

    function navigateToMain() {
      router.push({ path: `/` });
    }

    return {
      navigateToTable,
      navigateToMain,
    };
  },
});
