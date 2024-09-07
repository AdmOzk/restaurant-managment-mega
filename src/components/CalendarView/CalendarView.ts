import { defineComponent, ref,computed } from 'vue';
import { useRouter } from 'vue-router';
import CalendarEventPopUp from '../Popups/CalendarEventPopUp/CalendarEventPopUp.vue'; // Two levels up

export default defineComponent({
  name: 'CalendarView',
  components: {
    CalendarEventPopUp,
  },
  setup() {
    const today = new Date();
    const selectedDate = ref<string | null>(null);
    const currentMonthIndex = ref(today.getMonth());
    const currentYear = ref(today.getFullYear());
    const showPopup = ref(false); // State for controlling pop-up visibility

    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

    const formattedToday = computed(() => {
      const day = String(today.getDate()).padStart(2, '0');
      const month = months[today.getMonth()];
      const year = today.getFullYear();
      return `${day} ${month} ${year}`;
    });

    const daysInMonth = computed(() => {
      const month = currentMonthIndex.value;
      const year = currentYear.value;
      return new Date(year, month + 1, 0).getDate();
    });

    const firstDayOfMonth = computed(() => {
      const month = currentMonthIndex.value;
      const year = currentYear.value;
      return new Date(year, month, 1).getDay();
    });

    const blankDays = computed(() => {
      return Array.from({ length: firstDayOfMonth.value }, (_, i) => i + 1);
    });

    const currentMonth = computed(() => {
      return months[currentMonthIndex.value];
    });

    const prevMonth = () => {
      if (currentMonthIndex.value === 0) {
        currentMonthIndex.value = 11;
        currentYear.value -= 1;
      } else {
        currentMonthIndex.value -= 1;
      }
    };

    const nextMonth = () => {
      if (currentMonthIndex.value === 11) {
        currentMonthIndex.value = 0;
        currentYear.value += 1;
      } else {
        currentMonthIndex.value += 1;
      }
    };

    const selectDate = (day: number) => {
      selectedDate.value = `${String(day).padStart(2, '0')}-${String(currentMonthIndex.value + 1).padStart(2, '0')}-${currentYear.value}`;
    };

    const clearDate = () => {
      selectedDate.value = null;
    };

    const isToday = (day: number) => {
      return (
        day === today.getDate() &&
        currentMonthIndex.value === today.getMonth() &&
        currentYear.value === today.getFullYear()
      );
    };

    const isSelectedDay = (day: number) => {
      const formattedDay = `${String(day).padStart(2, '0')}-${String(currentMonthIndex.value + 1).padStart(2, '0')}-${currentYear.value}`;
      return formattedDay === selectedDate.value;
    };

    const router = useRouter();

    const navigateToMain = () => {
      router.push({ path: '/' });
    };

    const showEventPopup = () => {
      showPopup.value = true;
    };

    const closeEventPopup = () => {
      showPopup.value = false;
    };

    return {
      days,
      daysInMonth,
      blankDays,
      currentMonth,
      currentYear,
      selectedDate,
      prevMonth,
      nextMonth,
      selectDate,
      clearDate,
      isToday,
      isSelectedDay,
      formattedToday,
      navigateToMain,
      showPopup,
      showEventPopup,
      closeEventPopup,
    };
  },
});