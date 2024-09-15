import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ReservationPopUp',
  props: {
    showPopup: Boolean,
    reservation: Object,
  },
  emits: ['close', 'update', 'cancel', 'create'],
  setup(props, { emit }) {
    const router = useRouter();

    function closePopup() {
      emit('close');
    }

    function updateReservation() {
      if (props.reservation) {
        emit('update', props.reservation); // props.reservation null veya undefined değilse update yap
      }
    }

    function cancelReservation() {
      if (props.reservation?.id) {
        emit('cancel', props.reservation.id); // props.reservation ve id null değilse iptal et
      }
    }

    function createNewReservation() {
      if (props.reservation) {
        emit('create', props.reservation); // props.reservation null veya undefined değilse rezervasyon oluştur
      }
    }

    function navigateToMain() {
      router.push({ path: '/' });
    }

    return {
      closePopup,
      updateReservation,
      cancelReservation,
      createNewReservation,
      navigateToMain,
    };
  },
});
