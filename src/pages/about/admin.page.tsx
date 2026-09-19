import { useEffect, useState } from 'react';
import type { Tables } from '../../app/models/supabase';
import adminService from '../../app/services/admin.service';
import Loading from '../../components/loading.component';
import { useWindowTitle } from '../../app/stores/app.store';
import { PAGES_TITLES } from '../../app/utils/constants';
import Helpers from '../../app/utils/helpers.utils';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function CreatorPage() {
    const [creator, setCreator] = useState<Tables<'admin'>>();
    const [hasError, setHasError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>();
    const updateTitle = useWindowTitle((state) => state.updateTitle);
    const getCreator = async () => {
        updateTitle(PAGES_TITLES.admin);
        const data = await adminService.get();
        if (!data || data === null) {
            setHasError(true);
            return;
        }
        setCreator(data);
    };
    const tryGetAdminReadme = async () => {
        if (creator) {
            const DEFAULT_URL = `https://raw.githubusercontent.com/${creator.login}/${creator.login}/main/README.md`;
            const res = await Helpers.getReadme(creator.login, creator.login, DEFAULT_URL);
            if (res && res.length > 0) {
                setDescription(res);
            }
        }
    };
    useEffect(() => {
        tryGetAdminReadme();
    }, [creator]);
    useEffect(() => {
        getCreator();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            {hasError ? (
                <div>Has been an error getting Admin data, try again.</div>
            ) : creator ? (
                <div className="w-full h-full flex flex-wrap justify-center">
                    <div className="w-full flex flex-col items-center">
                        <h1 className="text-3xl text-primary mb-6">
                            Admin <span className="font-bold">{creator.name ?? creator.login}</span>
                        </h1>
                        <div className="rounded-4xl w-1/2 lg:w-1/4 h-auto aura aura-dual text-primary mb-2">
                            <img className="rounded-4xl w-full h-full" src={`${creator.avatar_url}`} alt={`GitHub Profile Image from user '${creator.login}'`} />
                        </div>
                        <div className="w-full flex flex-wrap justify-center items-center">
                            <span className="m-1 badge badge-soft badge-dash">
                                <i className="fa-solid fa-building"></i>
                                {creator.company ?? <span className="italic">No Company</span>}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-street-view"></i>
                                {creator.location ?? <span className="italic">No Location</span>}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-globe"></i>
                                {creator.website_url ? (
                                    <a href={Helpers.goToCustom(creator.website_url)} target="_blank">
                                        Website
                                    </a>
                                ) : (
                                    <span className="italic">No website</span>
                                )}
                            </span>
                            <span className="m-1 badge badge-soft badge-info">
                                <i className="fa-solid fa-clock"></i>
                                {creator.created_at}
                            </span>
                            <a href={Helpers.goToCustom(creator.url)} className="m-1 badge badge-soft badge-success">
                                <i className="fa-brands fa-github"></i>
                                {creator.login}
                            </a>
                            <a className="m-1 badge badge-soft badge-warning" href={Helpers.goToCustom(`https://github.com/${creator.login}?tab=stars`)} target="_blank">
                                <i className="fa-solid fa-star"></i>
                                {creator.stargazercount}
                            </a>
                        </div>
                        <div className={'lg:mt-10 md:mt-10 mt-15 mb-5 p-5 transition-all w-[98dvw] lg:w-full md:w-full md-preview'}>
                            {!description ? <p>{creator.bio ?? <span className="italic text-neutral text-xs">No Description</span>}</p> : <MarkdownPreview source={description} className="z-0 w-full min-w-3" urlTransform={Helpers.goToCustom} />}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
