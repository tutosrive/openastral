import Helpers from '../../app/utils/helpers.utils';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearch } from '../../app/stores/search.store';
import { useEffect } from 'react';

export default function AboutPage() {
    const tryGetPageReadme = async () => {
        const owner = 'tutosrive';
        const repo = 'openastral';
        const DEFAULT_URL = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
        return await Helpers.getReadme(owner, repo, DEFAULT_URL);
    };
    const updateTypeSearch = useSearch((state) => state.updateType);
    const { data } = useQuery<string | undefined>({ queryKey: ['about-page'], queryFn: tryGetPageReadme, notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const init = () => {
        updateTypeSearch('mix');
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <div className={'lg:mt-10 md:mt-10 mt-15 mb-5 p-5 transition-all w-[98dvw] lg:w-full md:w-full md-preview'}>
            <h1 className="text-center text-9xl text-primary britney-ft">
                <a href={Helpers.goToCustom('https://github.com/tutosrive/openastral')} target="_blank">
                    Open Astral
                </a>
            </h1>
            {!data ? (
                <p>
                    <span className="italic text-neutral text-xs">No Description</span>
                </p>
            ) : (
                <MarkdownPreview source={data} className="z-0 w-full min-w-3" urlTransform={Helpers.goToCustom} />
            )}
        </div>
    );
}
