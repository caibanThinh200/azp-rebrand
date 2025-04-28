export type AsyncComponent<T = {}> = (props: T) => Promise<ReactElement>;
