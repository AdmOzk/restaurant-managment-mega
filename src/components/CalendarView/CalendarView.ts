import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CalendarEventPopUp from '../Popups/CalendarEventPopUp/CalendarEventPopUp.vue';

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
    const showPopup = ref(false);

    // Example shift data for specific dates
    const exampleShifts: { [key: string]: { startTime: string; endTime: string } } = {
      '10-09-2024': { startTime: '09:00', endTime: '17:00' },
      '11-09-2024': { startTime: '08:00', endTime: '16:00' },
      '12-09-2024': { startTime: '10:00', endTime: '18:00' },
    };

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
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

    const currentMonth = computed(() => months[currentMonthIndex.value]);

    const hasShift = (day: number): boolean => {
      const formattedDay = `${String(day).padStart(2, '0')}-${String(currentMonthIndex.value + 1).padStart(2, '0')}-${currentYear.value}`;
      return exampleShifts.hasOwnProperty(formattedDay);
    };

    const selectDate = (day: number): void => {
      selectedDate.value = `${String(day).padStart(2, '0')}-${String(currentMonthIndex.value + 1).padStart(2, '0')}-${currentYear.value}`;
    };

    const isSelectedDay = (day: number): boolean => {
      const formattedDay = `${String(day).padStart(2, '0')}-${String(currentMonthIndex.value + 1).padStart(2, '0')}-${currentYear.value}`;
      return formattedDay === selectedDate.value;
    };

    const isToday = (day: number): boolean => {
      return (
        day === today.getDate() &&
        currentMonthIndex.value === today.getMonth() &&
        currentYear.value === today.getFullYear()
      );
    };

    const prevMonth = (): void => {
      if (currentMonthIndex.value === 0) {
        currentMonthIndex.value = 11;
        currentYear.value -= 1;
      } else {
        currentMonthIndex.value -= 1;
      }
    };

    const nextMonth = (): void => {
      if (currentMonthIndex.value === 11) {
        currentMonthIndex.value = 0;
        currentYear.value += 1;
      } else {
        currentMonthIndex.value += 1;
      }
    };

    const router = useRouter();

    const navigateToMain = (): void => {
      router.push({ path: '/' });
    };

    const showEventPopup = (): void => {
      showPopup.value = true;
    };

    const closeEventPopup = (): void => {
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
      clearDate: () => selectedDate.value = null,
      isToday,
      isSelectedDay,
      hasShift,
      formattedToday,
      navigateToMain,
      showPopup,
      showEventPopup,
      closeEventPopup,
    };
  },
});
