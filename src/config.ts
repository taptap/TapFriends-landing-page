export default {
  title: import.meta.env.VITE_TITLE,
  game: {
    name: import.meta.env.VITE_GAME_NAME,
    description: import.meta.env.VITE_GAME_DESC,
    url: import.meta.env.VITE_GAME_URL,
    iosLink: import.meta.env.VITE_IOS_LINK,
    androidLink: import.meta.env.VITE_ANDROID_LINK,
  },
  language: navigator?.language,
};
