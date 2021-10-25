import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

export default replace({
  __DOCUMENT_TITLE: process.env.DOCUMENT_TITLE ?? '',
  __GAME_NAME: process.env.GAME_NAME ?? '',
  __GAME_ICON: process.env.GAME_ICON ?? '',
  __GAME_DESC: process.env.GAME_DESC ?? '',
  __GAME_URL: process.env.GAME_URL ?? '',
  __GAME_IOS_LINK: process.env.GAME_IOS_LINK ?? '',
  __GAME_IOS_STORE: process.env.GAME_IOS_STORE ?? '',
  __GAME_ANDROID_LINK: process.env.GAME_ANDROID_LINK ?? '',
  __GAME_ANDROID_STORE: process.env.GAME_ANDROID_STORE ?? '',
});
