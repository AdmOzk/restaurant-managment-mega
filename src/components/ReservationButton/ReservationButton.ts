import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ReservationButton',
  // TS tarafı buraya
  setup(){
    const router = useRouter();


    function goToReservationPlan() {
      router.push('/ReservationPlan');
    }

    return {
      goToReservationPlan
    };
  },
});