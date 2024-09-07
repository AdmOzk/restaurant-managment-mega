import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CalendarEventPopUp',
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const shift = ref<{ startTime: string; endTime: string } | null>(null);

    // Example shift data for specific dates
    const exampleShifts: { [key: string]: { startTime: string; endTime: string } } = {
      '10-09-2024': { startTime: '09:00', endTime: '17:00' },
      '11-09-2024': { startTime: '08:00', endTime: '16:00' },
      '12-09-2024': { startTime: '10:00', endTime: '18:00' },
    };

    const fetchShiftForDate = (date: string) => {
      console.log('Fetching shift for date:', date); // Debugging log
      if (exampleShifts[date]) {
        console.log('Shift found:', exampleShifts[date]); // Debugging log
        shift.value = exampleShifts[date]; // Return shift if date exists in exampleShifts
      } else {
        console.log('No shift for this date'); // Debugging log
        shift.value = null; // No shift for other dates
      }
    };

    watch(
      () => props.selectedDate,
      (newDate) => {
        fetchShiftForDate(newDate); // Fetch shift for the selected date
      },
      { immediate: true }
    );

    const closePopup = () => {
      emit('close');
    };

    return {
      closePopup,
      shift,
    };
  },
});
