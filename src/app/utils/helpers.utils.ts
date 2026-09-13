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
}
