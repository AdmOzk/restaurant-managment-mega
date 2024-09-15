import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  
  name: 'ReservationPlan',
  // TS 
  setup() {
    const router = useRouter();

    function navigateToMain() {
      router.push({ path: `/` });
    }

  

    return {
      navigateToMain
    };
  },
});




