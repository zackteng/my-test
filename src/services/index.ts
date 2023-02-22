import axios from "axios";
import type { SearchPhotosParams, SearchPhotosResult } from "../types";

/**按关键字搜索照片
 * @params SearchPhotosParams
 * @returns SearchPhotosResult
 */
export async function searchPhotos(params?: SearchPhotosParams) {
  return axios.get<SearchPhotosResult>(
    "https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=kittens",
    {
      params: {
        ...params,
        method: "flickr.photos.search",
        api_key: "3e7cc266ae2b0e0d78e279ce8e361736",
        format: "json",
        nojsoncallback: 1,
        safe_search: 1,
      },
    }
  );
}
