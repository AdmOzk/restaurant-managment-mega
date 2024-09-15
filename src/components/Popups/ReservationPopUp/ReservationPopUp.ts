import { defineComponent, ref } from 'vue';

interface Reservation {
  id: string;
  time: string;
  name: string;
  date: string;
}

export default defineComponent({
  name: 'ReservationPopUp',
  props: {
    showPopup: Boolean,
    reservations: Array as () => Reservation[],
    selectedReservation: Object as () => Reservation | null,
    selectedTable: String,
  },
  emits: ['close', 'update', 'cancel', 'create', 'select'],
  setup(props, { emit }) {
    const newReservation = ref<Reservation>({ time: '', name: '', date: '', id: '' });

    function closePopup() {
      emit('close');
    }

    function updateReservation() {
      if (props.selectedReservation) {
        emit('update', props.selectedReservation);
      }
    }

    function cancelReservation() {
      if (props.selectedReservation) {
        emit('cancel', props.selectedReservation.id);
      }
    }

    function createNewReservation() {
      if (!newReservation.value.name.trim()) {
        alert('Lütfen rezervasyon yapan ismi giriniz.');
        return;
      }
      emit('create', newReservation.value);
    }

    function selectReservation(reservation: Reservation) {
      emit('select', reservation);
    }

    return {
      closePopup,
      updateReservation,
      cancelReservation,
      createNewReservation,
      selectReservation,
      newReservation,
    };
  },
});
