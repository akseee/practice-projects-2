import { INewsResponse, ISourcesResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor(
        private controller = new AppController(),
        private view = new AppView()
    ) {}

    start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data: INewsResponse) => this.view.drawNews(data))
            );
        this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
