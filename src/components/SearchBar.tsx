import React, { useState } from "react";
import "./SearchBar.css";

export interface SearchBarProps {
  onSearch?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="search-bar-wrap">
      <div className="search-bar">
        <input className="search-input" placeholder="请输入关键字" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="search-button" onClick={() => onSearch?.(value)}>搜索</button>
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
