import type { Photo } from "../types";

type PhotoSize = keyof(typeof SizeSuffixMap);

const SizeSuffixMap = {
  'normal': '',
  'large': '_b',
} as const;

export const generatePhotoUrl = (photo: Photo, size?: PhotoSize) => {
  const sizeSuffix = SizeSuffixMap[size ?? 'normal']
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${sizeSuffix}.jpg`;
};
