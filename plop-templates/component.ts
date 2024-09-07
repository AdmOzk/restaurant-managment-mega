import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  
  name: '{{pascalCase name}}',
  // TS 
  setup() {
    const router = useRouter();

    function navigateToMain() {
      router.push({ path: `/` });
    }

    return {
      navigateToMain,
    };
  },
});




