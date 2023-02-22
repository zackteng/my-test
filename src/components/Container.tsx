import React, { useEffect, useMemo, useState, useCallback } from "react";
import _unionBy from "lodash/unionBy";
import { useInfiniteQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import type { Photo } from "../types";
import useForceRender from "../hooks/useForceRender";
import { searchPhotos } from "../services/index";
import SearchBar from "./SearchBar";
import PhotoList from "./PhotoList";
import "./Container.css";

export interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  // 因为react的eager机制 如果两次setSearchText的值是一样的不会触发更新
  // 所以这里加入一个forceRender的逻辑，确保多次点击搜索都会触发搜索
  const [searchText, setSearchText] = useState("");
  const [currentCount, forceRender] = useForceRender();

  const { data, isFetching, isFetched, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["photos", { text: searchText, currentCount }],
      async ({ pageParam = 1 }) => {
        const result = await searchPhotos({
          page: pageParam,
          text: searchText,
        });
        if (result.data.stat === "ok") {
          return result.data;
        }
        if (result.data.stat === "fail") {
          throw new Error(result.data.message);
        }
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage && lastPage.photos.page < lastPage.photos.pages
            ? lastPage.photos.page + 1
            : undefined,
        enabled: !!searchText,
        cacheTime: 0,
        onError(error: Error) {
          window.alert(error.message);
        },
      }
    );

  // 将所有分页的数据提取到一个数组方便后续处理
  // api返回的数据不同的分页会有重复的，这里简单去下重
  const records = useMemo(() => {
    return _unionBy(
      data?.pages.reduce(
        (memo, page) => memo.concat(page?.photos.photo || []),
        [] as Photo[]
      ) || [],
      "id"
    );
  }, [data?.pages]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      forceRender();
    },
    [forceRender, setSearchText]
  );

  // 根据isFetching和isFetched还有hasNextPage来生成不同情况下的底部展示
  const renderFooterContent = () => {
    if (isFetching) {
      return <ClipLoader />;
    }
    if (isFetched) {
      if (hasNextPage) {
        return (
          <button className="loadMore-button" onClick={() => fetchNextPage()}>
            加载更多
          </button>
        );
      }
      return "没有更多了";
    } else {
      return "请输入关键字并点击搜索按钮开始搜索";
    }
  };

  // 搜索条件改变的时候页面滚回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchText]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div style={{ padding: 20 }}>
        <PhotoList data={records} />
        <div className="footer">{renderFooterContent()}</div>
      </div>
    </>
  );
};

export default Container;
