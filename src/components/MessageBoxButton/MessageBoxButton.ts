import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MessageBoxButton',
  setup() {
    const router = useRouter();

    function goToMessageBox() {
      router.push('/MessageBox');
    }

    return {
      goToMessageBox
    };
  }

});