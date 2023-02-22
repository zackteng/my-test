import React from "react";
import type { Photo } from "../types/index";
import PhotoItem from "./PhotoItem";
import "./PhotoList.css";

export interface PhotoListProps {
  data: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({ data }) => {
  return (
    <div className="photo-list">
      {data.map((d) => (
        <PhotoItem key={d.id} data={d} />
      ))}
    </div>
  );
};

export default PhotoList;
