export interface INewsResponse {
    articles?: INewsItem[];
}

export interface ISourcesResponse {
    sources?: ISource[];
}

export interface INewsItem {
    urlToImage: URL;
    author?: string;
    source: ISource;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: URL;
    category: Categories;
    language: Languages;
    country: Countries;
}

export interface IResponse {
    status: string;
    sources: ISource[];
}

export interface IRequest {
    apiKey: string;
    category: Categories;
    language: Languages;
    country: Countries;
}

export type URLMethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Categories = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
type Languages = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';
type Countries =
    | 'ae'
    | 'ar'
    | 'at'
    | 'au'
    | 'be'
    | 'bg'
    | 'br'
    | 'ca'
    | 'ch'
    | 'cn'
    | 'co'
    | 'cu'
    | 'cz'
    | 'de'
    | 'ee'
    | 'eg'
    | 'fr'
    | 'gb'
    | 'gr'
    | 'hk'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'in'
    | 'it'
    | 'jp'
    | 'kr'
    | 'lt'
    | 'lv'
    | 'ma'
    | 'mx'
    | 'my'
    | 'ng'
    | 'nl'
    | 'no'
    | 'nz'
    | 'ph'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'th'
    | 'tr'
    | 'tw'
    | 'ua'
    | 'us'
    | 've'
    | 'za';
