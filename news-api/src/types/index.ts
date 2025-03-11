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

export enum URLMethodTypes {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum Categories {
    BUSINESS = 'business',
    ENTERTAINMENT = 'entertainment',
    GENERAL = 'general',
    HEALTH = 'health',
    SCIENCE = 'science',
    SPORTS = 'sports',
    TECHNOLOGY = 'technology',
}

export enum Languages {
    AR = 'ar',
    DE = 'de',
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    HE = 'he',
    IT = 'it',
    NL = 'nl',
    NO = 'no',
    PT = 'pt',
    RU = 'ru',
    SV = 'sv',
    UD = 'ud',
    ZH = 'zh',
}

export enum Countries {
    AE = 'ae',
    AR = 'ar',
    AT = 'at',
    AU = 'au',
    BE = 'be',
    BG = 'bg',
    BR = 'br',
    CA = 'ca',
    CH = 'ch',
    CN = 'cn',
    CO = 'co',
    CU = 'cu',
    CZ = 'cz',
    DE = 'de',
    EE = 'ee',
    EG = 'eg',
    FR = 'fr',
    GB = 'gb',
    GR = 'gr',
    HK = 'hk',
    HU = 'hu',
    ID = 'id',
    IE = 'ie',
    IL = 'il',
    IN = 'in',
    IT = 'it',
    JP = 'jp',
    KR = 'kr',
    LT = 'lt',
    LV = 'lv',
    MA = 'ma',
    MX = 'mx',
    MY = 'my',
    NG = 'ng',
    NL = 'nl',
    NO = 'no',
    NZ = 'nz',
    PH = 'ph',
    PL = 'pl',
    PT = 'pt',
    RO = 'ro',
    RS = 'rs',
    RU = 'ru',
    SE = 'se',
    SG = 'sg',
    SI = 'si',
    SK = 'sk',
    TH = 'th',
    TR = 'tr',
    TW = 'tw',
    UA = 'ua',
    US = 'us',
    VE = 've',
    ZA = 'za',
}
