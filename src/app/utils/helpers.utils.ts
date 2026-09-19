import type { Repository } from '../models/models';
import { CUSTOM_BADGES_STYLES } from './constants';

export default class Helpers {
    static getRandomBadgeStyle(): string {
        const randomIndex: number = Math.floor(Math.random() * CUSTOM_BADGES_STYLES.length);
        return CUSTOM_BADGES_STYLES[randomIndex];
    }

    static getUrlStargazerHistoric(repository: Repository): string {
        return `https://www.star-history.com/${repository.owner.login}/${repository.name}`;
    }

    static formatNumberToCompact(n: number): string {
        return Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(n);
    }

    static capitalizeString(str: string): string {
        let capitalized = '';
        str.split(' ').forEach((split) => {
            capitalized += split.charAt(0).toUpperCase() + split.substring(1, split.length);
        });

        return capitalized;
    }

    static getInitialThemeFromLocal() {
        const theme = localStorage.getItem('theme');
        return theme !== 'true' && theme && theme.length > 4 ? theme : 'default';
    }

    static async getReadme(repo: string, owner: string, urlReadme: string, intents: number = 1, isGithub: boolean = false): Promise<string | undefined> {
        const TOKEN = import.meta.env.VITE_GH_TOKEN;
        let req;
        try {
            if (isGithub === true) {
                req = await fetch(urlReadme, { headers: { Accept: 'application/vnd.github.v3.raw', Authorization: `token ${TOKEN}`, 'X-GitHub-Api-Version': '2026-03-10' }, method: 'GET' });
            } else {
                req = await fetch(urlReadme);
            }
            if (req.status === 200 || intents === 3) {
                return req.text();
            }
            if (req.status === 404) {
                throw new Error('Readme Not Found');
            }

            if (isGithub === true) {
                const TEMP_RES = await req.json();
                return this.getReadme(repo, owner, TEMP_RES.download_url, intents + 1);
            }
        } catch (e) {
            return this.getReadme(repo, owner, `https://api.github.com/repos/${owner}/${repo}/readme`, intents + 1, true);
        }
    }

    static goToCustom(url: string) {
        const REF_URL: string = 'openastral.pages.dev';
        let newUrl: string = url;
        if (url.includes('star-history.com') || url.includes('github.com')) {
            newUrl = `${url}?ref=${REF_URL}`;
        } else if (!url.includes(REF_URL)) {
            newUrl = `${url}?utm_source=${REF_URL}`;
        }
        return newUrl;
    }
}
