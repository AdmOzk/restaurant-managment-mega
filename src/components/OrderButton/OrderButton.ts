import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'OrderButton',
  setup() {
    const router = useRouter();

    function goToSeatPlan() {
      router.push('/SeatPlan');
    }

    return {
      goToSeatPlan
    };
  }
});
