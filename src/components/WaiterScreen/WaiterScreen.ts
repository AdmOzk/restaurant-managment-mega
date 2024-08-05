import { defineComponent } from 'vue';
import PaymentButton from '../PaymentButton/PaymentButton.vue';
import OrderButton from '../OrderButton/OrderButton.vue';
import CalendarButton from '../CalendarButton/CalendarButton.vue';
import PersonalInfoButton from '../PersonalInfoButton/PersonalInfoButton.vue';
import MessageBoxButton from '../MessageBoxButton/MessageBoxButton.vue';

export default defineComponent({
  name: 'WaiterScreen',
  components:{
    PaymentButton,
    OrderButton,
    CalendarButton,
    PersonalInfoButton,
    MessageBoxButton
  }
  // TS tarafı buraya
});

