import { CUSTOM_BADGES_STYLES } from './constants';

export default class Helpers {
    static getRandomBadgeStyle(): string {
        const randomIndex: number = Math.floor(Math.random() * CUSTOM_BADGES_STYLES.length);
        return CUSTOM_BADGES_STYLES[randomIndex];
    }
}
