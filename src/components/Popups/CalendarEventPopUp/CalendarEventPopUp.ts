// import { defineComponent } from 'vue';
// import { useRouter } from 'vue-router';

// export default defineComponent({
  
//   name: 'CalendarEventPopUp',
//   // TS 
//   setup() {
//     const router = useRouter();

//     function navigateToMain() {
//       router.push({ path: `/` });
//     }

//     return {
//       navigateToMain,
//     };
//   },
// });




import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalendarEventPopUp',
  emits: ['close'],
  setup(props, { emit }) {
    const closePopup = () => {
      emit('close');
    };

    return {
      closePopup,
    };
  },
});