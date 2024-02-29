export interface HyperButton {
    text: string;
    href: string;
    external?: boolean;
    sideEffect?: () => void;
}