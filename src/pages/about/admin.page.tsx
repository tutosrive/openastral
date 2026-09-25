import { useEffect, useState } from 'react';
import adminService from '../../app/services/admin.service';
import Loading from '../../components/loading.component';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import Helpers from '../../app/utils/helpers.utils';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useSearch } from '../../app/stores/search.store';

export default function CreatorPage() {
    const [description, setDescription] = useState<string>();
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    // const updateTypeSearch = useSearch((state) => state.updateType);
    const { data } = useQuery({ queryKey: ['admin'], queryFn: () => adminService.get(), notifyOnChangeProps: ['data'], placeholderData: keepPreviousData, staleTime: Infinity });
    const startCreator = async () => {
        // updateTypeSearch('mix');
        updateTitle(PAGES_TITLES.admin);
    };
    const tryGetAdminReadme = async () => {
        if (data) {
            const DEFAULT_URL = `https://raw.githubusercontent.com/${data.login}/${data.login}/main/README.md`;
            const res = await Helpers.getReadme(data.login, data.login, DEFAULT_URL);
            if (res && res.length > 0) {
                setDescription(res);
            }
        }
    };
    useEffect(() => {
        tryGetAdminReadme();
    }, [data]);
    useEffect(() => {
        startCreator();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            {data ? (
                <div className="w-full h-full flex flex-wrap justify-center">
                    <div className="w-full flex flex-col items-center">
                        <h1 className="text-3xl text-primary mb-6">
                            Admin <span className="font-bold">{data.name ?? data.login}</span>
                        </h1>
                        <div className="rounded-4xl w-1/2 lg:w-1/4 h-auto aura aura-dual text-primary mb-2">
                            <img className="rounded-4xl w-full h-full" src={`${data.avatar_url}`} alt={`GitHub Profile Image from user '${data.login}'`} />
                        </div>
                        <div className="w-full flex flex-wrap justify-center items-center">
                            <span className="m-1 badge badge-soft badge-dash">
                                <i className="fa-solid fa-building"></i>
                                {data.company ?? <span className="italic">No Company</span>}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-street-view"></i>
                                {data.location ?? <span className="italic">No Location</span>}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-globe"></i>
                                {data.website_url ? (
                                    <a href={Helpers.goToCustom(data.website_url)} target="_blank">
                                        Website
                                    </a>
                                ) : (
                                    <span className="italic">No website</span>
                                )}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-clock"></i>
                                {data.created_at}
                            </span>
                            <a href={Helpers.goToCustom(data.url)} className="m-1 badge badge-soft badge-success">
                                <i className="fa-brands fa-github"></i>
                                {data.login}
                            </a>
                            <a className="m-1 badge badge-soft badge-warning" href={Helpers.goToCustom(`https://github.com/${data.login}?tab=stars`)} target="_blank">
                                <i className="fa-solid fa-star"></i>
                                {data.stargazercount}
                            </a>
                        </div>
                        <div className={'lg:mt-10 md:mt-10 mt-15 mb-5 p-5 transition-all w-[98dvw] lg:w-full md:w-full md-preview'}>
                            {!description ? <p>{data.bio ?? <span className="italic text-neutral text-xs">No Description</span>}</p> : <MarkdownPreview source={description} className="z-0 w-full min-w-3" urlTransform={Helpers.goToCustom} />}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
