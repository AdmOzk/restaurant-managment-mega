import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CalendarButton',
  setup() {
    const router = useRouter();

    function goToCalendar() {
      router.push('/CalendarView');
    }

    return {
      goToCalendar
    };
  }
  // TS 
});