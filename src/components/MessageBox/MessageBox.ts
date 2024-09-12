import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
  profilePicture?: string;
  userName: string; // To track which user sent this message
}

interface User {
  name: string;
  unreadMessages: number;
}

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const router = useRouter();

    // Kullanıcılar (Dummy Data)
    const users = ref<User[]>([
      { name: 'Ahmet', unreadMessages: 2 },
      { name: 'Mehmet', unreadMessages: 1 },
      { name: 'Dilara', unreadMessages: 3 },
    ]);

    // Mesajlar (Dummy Data)
    const messages = ref<Message[]>([
      {
        id: 1,
        sender: 'other',
        userName: 'Ahmet',
        text: 'Hello from Ahmet!',
        time: '10:00 AM',
        profilePicture: require('@/assets/ahmet.jpg'), // Dinamik olarak resim yolu
      },
      {
        id: 2,
        sender: 'me',
        userName: 'Ahmet',
        text: 'Hi Ahmet!',
        time: '10:01 AM',
      },
      {
        id: 3,
        sender: 'other',
        userName: 'Mehmet',
        text: 'Message from Mehmet.',
        time: '10:05 AM',
        profilePicture: require('@/assets/mehmet.jpg'),
      },
      {
        id: 4,
        sender: 'other',
        userName: 'Dilara',
        text: 'Message from Dilara.',
        time: '10:10 AM',
        profilePicture: require('@/assets/dilara.jpg'),
      },
    ]);

    const newMessage = ref('');
    const activeUser = ref<string | null>(null);
    const showNewConversationScreen = ref(false);

    const selectUser = (user: User) => {
      activeUser.value = user.name;
      user.unreadMessages = 0; // Okunmamış mesajları sıfırla
    };

    const filteredMessages = computed(() => {
      if (!activeUser.value) return [];
      return messages.value.filter(
        (message) => message.userName === activeUser.value
      );
    });

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        messages.value.push({
          id: messages.value.length + 1,
          sender: 'me',
          userName: activeUser.value!,
          text: newMessage.value,
          time: new Date().toLocaleTimeString(),
        });
        newMessage.value = '';
      }
    };

    const startNewConversation = () => {
      activeUser.value = null;
      showNewConversationScreen.value = true;
    };

    const selectUserForNewConversation = (user: User) => {
      activeUser.value = user.name;
      showNewConversationScreen.value = false;
    };

    const goBack = () => {
      activeUser.value = null;
    };

    const getProfilePicture = (userName: string) => {
      switch (userName) {
        case 'Ahmet':
          return require('@/assets/ahmet.jpg');
        case 'Mehmet':
          return require('@/assets/mehmet.jpg');
        case 'Dilara':
          return require('@/assets/dilara.jpg');
        default:
          return '';
      }
    };

    return {
      users,
      messages,
      newMessage,
      activeUser,
      selectUser,
      filteredMessages,
      sendMessage,
      getProfilePicture,
      goBack,
      startNewConversation,
      selectUserForNewConversation,
      showNewConversationScreen,
    };
  },
});
