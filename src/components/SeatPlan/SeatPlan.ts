import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SeatPlan',
  // TS 

  setup() {
    const router = useRouter();

    function navigateToTable(tableId: string) {
      router.push({ path: `/OrderManagment/${tableId}` });
    }

    return {
      navigateToTable, // Bu fonksiyonu template kısmında kullanabilmek için return ediyoruz
    };
  }



});