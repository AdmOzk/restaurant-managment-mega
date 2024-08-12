import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Menu',
  // TS 
  setup() {
    const router = useRouter();

    function goToMenu() {
      router.push('/Menu');
    }

    return {
      goToMenu
    };
  }
});