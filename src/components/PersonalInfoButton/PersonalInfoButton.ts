import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PersonalInfoButton',
  setup()
  {
    const router = useRouter();

    function goToPersonalSettings() {
      router.push('/PersonalSettings');
    }

    return {
      goToPersonalSettings
    };


  }
  

  // TS 
});