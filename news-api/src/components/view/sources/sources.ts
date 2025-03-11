import { Categories, ISource } from '../../../types';
import './sources.css';

class Sources {
    draw(data: ISource[]) {
        const categoryFragment = document.createDocumentFragment();
        const sourceCategoryTemp = document.querySelector<HTMLTemplateElement>('#sourceCategoryTemp')

        const categorized: Record<Categories, ISource[]> = data.reduce(
            (acc, item) => {
                if (item.category === 'general') {
                    return acc;
                }
                if (!acc[item.category]) {
                    acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
            },
            {} as Record<Categories, ISource[]>
        );

        Object.keys(categorized).forEach((category) => {
            const categoryClone = sourceCategoryTemp.content.cloneNode(true) as DocumentFragment;
            categoryClone.querySelector('.source__category-name').textContent =
                category.charAt(0).toUpperCase() + category.slice(1);
            categoryClone.querySelector('.source__category-name').setAttribute('data-category', category);

            const fragment = document.createDocumentFragment();
            const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp')
            const sourcesContainer = document.querySelector('.sources');

            categorized[category as Categories].forEach((item: ISource) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

                sourceClone.querySelector('.source__item-name').textContent = item.name;
                sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
                sourceClone.querySelector('.source__item').setAttribute('data-source-category', category);

                sourceClone.querySelector('.source__item')!.classList.add('visually-hidden');

                fragment.append(sourceClone);
            });

            sourcesContainer.append(fragment);
            categoryFragment.append(categoryClone);
        });

        document.querySelector('.categories').append(categoryFragment);

        const categoryElements = document.querySelectorAll('.source__category-name');
        categoryElements.forEach((element) => {
            element.addEventListener('click', () => {
                const selectedCategory = element.getAttribute('data-category');

                categoryElements.forEach((element) => element.classList.remove('active'));
                element.classList.add('active');

                const allSources = document.querySelectorAll('.source__item');
                allSources.forEach((source) => {
                    source.classList.add('visually-hidden');
                    source.classList.remove('active');
                });

                const selectedSourcesFromCategory = document.querySelectorAll(
                    `.source__item[data-source-category=${selectedCategory}]`
                );

                selectedSourcesFromCategory.forEach((source) => {
                    source.addEventListener('click', () => {
                        selectedSourcesFromCategory.forEach((item) => item.classList.remove('active'));
                        source.classList.toggle('active');
                    });
                    source.classList.remove('visually-hidden');
                });
            });
        });
    }
}

export default Sources;
