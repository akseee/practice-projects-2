import { INewsResponse, ISourcesResponse } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: ISourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: INewsResponse) => void): void {

        if (!(e.target instanceof HTMLElement) || !(e.currentTarget instanceof HTMLElement)) {
            return;
        }
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }

            if (!(target.parentNode instanceof HTMLElement)) {
                return
            }
            target = target.parentNode ;
        }
    }
}

export default AppController;
