import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PersonalSettings',
  setup() {
    const router = useRouter();
    
    // State tanımlamaları
    const profileImage = ref('https://bootdey.com/img/Content/avatar/avatar7.png');
    const firstName = ref('dey-dey');
    const lastName = ref('bootdey');
    const username = ref('bootdey');  // Değiştirilebilir
    const email = ref('janesemail@gmail.com');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const role = ref('Manager');  // Dropdown'dan gelen görev, değiştirilemez
    const roles = ref([
      { value: 'Manager', text: 'Manager' },
      { value: 'Waiter', text: 'Waiter' },
      { value: 'Chef', text: 'Chef' },
    ]);

    function navigateToMain() {
      router.push({ path: '/' });
    }

    function onFileChange(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          profileImage.value = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    }

    function saveChanges() {
      // Şifre ve email değişikliklerini kaydetme
      if (newPassword.value !== confirmPassword.value) {
        alert('Şifreler eşleşmiyor!');
        return;
      }

      // API çağrısı vs. yapılarak değişiklikler kaydedilebilir
      alert('Değişiklikler kaydedildi!');
    }

    return {
      profileImage,
      firstName,
      lastName,
      username,  // Artık v-model ile değiştirilebilir
      email,
      newPassword,
      confirmPassword,
      role,
      roles,
      navigateToMain,
      onFileChange,
      saveChanges,
    };
  },
});
