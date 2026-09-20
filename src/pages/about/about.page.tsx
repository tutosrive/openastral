import { useEffect, useState } from 'react';
import Helpers from '../../app/utils/helpers.utils';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function AboutPage() {
    const [description, setDescription] = useState<string>();
    const tryGetPageReadme = async () => {
        const owner = 'tutosrive';
        const repo = 'openastral';
        const DEFAULT_URL = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
        const res = await Helpers.getReadme(owner, repo, DEFAULT_URL);
        if (res && res.length > 0) {
            setDescription(res);
        }
    };
    useEffect(() => {
        tryGetPageReadme();
    }, []);

    return (
        <div className={'lg:mt-10 md:mt-10 mt-15 mb-5 p-5 transition-all w-[98dvw] lg:w-full md:w-full md-preview'}>
            <h1 className="text-center text-9xl text-primary britney-ft">
                <a href={Helpers.goToCustom('http://github.com/tutosrive/openastral')} target="_blank">
                    Open Astral
                </a>
            </h1>
            {!description ? (
                <p>
                    <span className="italic text-neutral text-xs">No Description</span>
                </p>
            ) : (
                <MarkdownPreview source={description} className="z-0 w-full min-w-3" urlTransform={Helpers.goToCustom} />
            )}
        </div>
    );
}
