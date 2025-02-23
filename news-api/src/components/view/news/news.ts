import { INewsItem } from '../../../types';
import './news.css';

class News {
    draw(data: INewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (news.length === 0) {
            document.querySelector('.news').innerHTML = '';
            const p = document.createElement('p');
            p.textContent = 'Currently we dont have news on this topic!';
            p.classList.add('empty');
            fragment.append(p);
            document.querySelector('.news').appendChild(fragment);
            return;
        }

        news.forEach((item: INewsItem, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement | null;

            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'https://archive.org/download/placeholder-image/placeholder-image.jpg'})`;

            newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.source.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
