import { defineComponent, ref } from 'vue';
import ReservationPopUp from '../Popups/ReservationPopUp/ReservationPopUp.vue';

export default defineComponent({
  components: { ReservationPopUp },
  setup() {
    const showPopup = ref(false);
    const currentReservation = ref({ id: '', time: '', name: '' });

    // Function to open the reservation pop-up for a specific table
    const navigateToReservation = (tableId: string) => {
      const reservationData = localStorage.getItem(tableId);
      currentReservation.value = reservationData
        ? JSON.parse(reservationData)
        : { id: tableId, time: '', name: '' };
      showPopup.value = true;
    };

    // Close the pop-up
    const closePopup = () => {
      showPopup.value = false;
    };

    // Update reservation in localStorage
    const updateReservation = (reservation: { id: string; time: string; name: string }) => {
      localStorage.setItem(reservation.id, JSON.stringify(reservation));
      showPopup.value = false;
    };

    // Cancel reservation
    const cancelReservation = (tableId: string) => {
      localStorage.removeItem(tableId);
      showPopup.value = false;
    };

    // Create a new reservation
    const createNewReservation = (reservation: { id: string; time: string; name: string }) => {
      localStorage.setItem(reservation.id, JSON.stringify(reservation));
      showPopup.value = false;
    };

    return {
      showPopup,
      currentReservation,
      navigateToReservation, // This ensures that navigateToReservation is accessible in your template
      closePopup,
      updateReservation,
      cancelReservation,
      createNewReservation,
    };
  },
});