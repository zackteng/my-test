export interface SearchPhotosParams {
  // method: string;
  // api_key: string;
  // format: string;
  // nojsoncallback: number;
  // safe_search: number;
  text: string;
  page?: number;
}

export interface Photo {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

export interface ResponseErrorData {
  stat: 'fail';
  code: number;
  message: string;
}

export interface ResponseSuccessData<T> {
  stat: 'ok';
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: T[];
  };
}

export type SearchPhotosResult = ResponseErrorData | ResponseSuccessData<Photo>