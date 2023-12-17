/**
 *
 * @flow
 */

export type ReactNodeList = ReactEmpty | React$Node;

export type RefObject = {
    current: any,
}

export type ReactProvider<T>= {
    $$typeof: symbol | number,
    type: ReactProviderType<T>,
    key: null | string,
    ref: null,
    props: {
        value: T,
        children?: ReactNodeList,
    }
}

export type ReactProviderType<T> = {
    $$typeof: symbol | number,
    _context: ReactContext<T>,
}


export type ReactConsumer<T>= {
    $$typeof: symbol | number,
    type: ReactContext<T>,
    key: null | string,
    ref: null,
    props: {
        children: (value: T) => ReactNodeList,
    }
}
export type ReactContext<T> = {
    $$typeof: symbol | number,
    Consumer: ReactContext<T>,
    Provider:  ReactProviderType<T>,
    _currentValue: T,
    _currentValue2: T,
    _threadCount: number,
    // DEV only
    _currentRenderer?: Object | null,
    _currentRenderer2?: Object | null,
    // This value may be added by application code
    // to improve DEV tooling display names
    displayName?: string,

    // only used by ServerContext
    _defaultValue: T,
    _globalName: string,
}