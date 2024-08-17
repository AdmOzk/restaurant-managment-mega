import { defineComponent } from 'vue';
import ReservationButton from '../ReservationButton/ReservationButton.vue';
import OrderButton from '../OrderButton/OrderButton.vue';
import CalendarButton from '../CalendarButton/CalendarButton.vue';
import PersonalInfoButton from '../PersonalInfoButton/PersonalInfoButton.vue';
import MessageBoxButton from '../MessageBoxButton/MessageBoxButton.vue';

export default defineComponent({
  name: 'WaiterScreen',
  components:{
    ReservationButton,
    OrderButton,
    CalendarButton,
    PersonalInfoButton,
    MessageBoxButton
  }
  // TS tarafı buraya
});

