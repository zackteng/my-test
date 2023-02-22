import React from "react";
import LazyLoad from "react-lazy-load";
import type { Photo } from "../types";
import { generatePhotoUrl } from "../utils";
import "./PhotoItem.css";

export interface PhotoItemProps {
  data: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ data }) => {
  const photoUrl = generatePhotoUrl(data);
  const largePhotoUrl = generatePhotoUrl(data, 'large');

  return (
    <div className="photo-item">
      <LazyLoad className="photo-lazy-load">
        <picture>
          <source media="(min-width: 1024px)" srcSet={largePhotoUrl} />
          <img className="photo" src={photoUrl} alt={data.title} />
        </picture>
      </LazyLoad>

      <div className="photo-title">{data.title}</div>
    </div>
  );
};

export default React.memo(PhotoItem);
