import { defineComponent, ref, onMounted } from 'vue';
import ReservationPopUp from '../Popups/ReservationPopUp/ReservationPopUp.vue';
import { useRouter } from 'vue-router';

// Define Reservation type
interface Reservation {
  id: number;
  tableId: string;
  name: string;
  time: string;
  date: string;
}

export default defineComponent({
  name: 'ReservationPlan',
  components: { ReservationPopUp },
  setup() {
    const showPopup = ref(false);
    const currentReservations = ref<Reservation[]>([]); // Array of reservations
    const selectedTable = ref<string | null>(null); // Selected table ID
    const reservations = ref<Reservation[]>([]); // Array to store all reservations
    const selectedReservation = ref<Reservation | null>(null); // Single selected reservation

    const loadReservations = () => {
      const storedReservations = localStorage.getItem('reservations');
      reservations.value = storedReservations ? JSON.parse(storedReservations) : [];
    };

    onMounted(() => {
      loadReservations();
    });

    const navigateToReservation = (tableId: string) => {
      selectedTable.value = tableId;
      currentReservations.value = reservations.value.filter(res => res.tableId === tableId);
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
      selectedTable.value = null;
      selectedReservation.value = null;
    };

    const router = useRouter();

    const navigateToMain = (): void => {
      router.push({ path: '/' });
    };


    const updateReservation = (updatedReservation: Reservation) => {
      const index = reservations.value.findIndex(
        res => res.id === updatedReservation.id && res.tableId === selectedTable.value
      );
      if (index !== -1) {
        reservations.value[index] = updatedReservation;
        localStorage.setItem('reservations', JSON.stringify(reservations.value));
      }
      closePopup();
    };

    const cancelReservation = (reservationId: number) => {
      reservations.value = reservations.value.filter(
        res => res.id !== reservationId || res.tableId !== selectedTable.value
      );
      localStorage.setItem('reservations', JSON.stringify(reservations.value));
      closePopup();
    };

    const createNewReservation = (newReservation: Reservation) => {
      if (!newReservation.name.trim()) {
        alert('Lütfen rezervasyon yapan ismi giriniz.');
        return;
      }
      const newRes = {
        ...newReservation,
        id: Date.now(),
        tableId: selectedTable.value || '',
      };
      reservations.value.push(newRes);
      localStorage.setItem('reservations', JSON.stringify(reservations.value));
      closePopup();
    };

    const selectReservation = (reservation: Reservation) => {
      selectedReservation.value = reservation;
    };

    const getTableColor = (tableId: string) => {
      const now = new Date();
      
      // Türkiye saat dilimine göre bugünün tarihini dinamik olarak alıyoruz
      const formatter = new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Europe/Istanbul'
      });
      
      const today = formatter.format(now).split('.').reverse().join('-'); // YYYY-MM-DD formatında bugünü elde ediyoruz
    
      const tableReservations = reservations.value.filter(res => res.tableId === tableId);
    
      for (const reservation of tableReservations) {
        if (reservation.date === today) {
          const resDateTime = new Date(`${reservation.date} ${reservation.time}`);
          const timeDiff = (resDateTime.getTime() - now.getTime()) / (1000 * 60); // Time difference in minutes
    
          if (timeDiff <= 60 && timeDiff >= -60) {
            return 'table-red'; // Red if within an hour or currently active
          } else if (timeDiff < 120 && timeDiff>60) {
            return 'table-orange'; // Orange if today and more than 1 hour away
          }
        }
      }
    
      return ''; // No color if no valid reservations for today
    };

    return {
      showPopup,
      currentReservations,
      selectedTable,
      selectedReservation,
      navigateToReservation,
      closePopup,
      updateReservation,
      cancelReservation,
      createNewReservation,
      selectReservation,
      getTableColor,
      navigateToMain,
    };
  },
});