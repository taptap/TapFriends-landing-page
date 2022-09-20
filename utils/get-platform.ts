const IOS_PATTERN = /iPhone|iPad|iPod/i;

const ANDROID_PATTERN = /Android/i;

const WECHAT_PATTERN = /micromessenger/i;

export enum Platform {
  Unknown,
  IOS,
  Android,
  Wechat,
}

export function getPlatform(ua?: string) {
  if (ua) {
    if (WECHAT_PATTERN.test(ua)) {
      return Platform.Wechat;
    }
    if (ANDROID_PATTERN.test(ua)) {
      return Platform.Android;
    }
    if (IOS_PATTERN.test(ua)) {
      return Platform.IOS;
    }
  }
  return Platform.Unknown;
}
