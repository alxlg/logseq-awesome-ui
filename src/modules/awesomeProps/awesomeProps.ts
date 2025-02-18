import {
    globalContext,
    body, doc
} from '../internal';

import awesomePropsStyles from './awesomeProps.css?inline';

export const toggleAwesomePropsFeature = () => {
    if (globalContext.pluginConfig.featureAwesomeProps) {
        awesomePropsLoad();
    } else {
        awesomePropsLoadUnload();
    }
}

export const awesomePropsLoad = () => {
    if (!globalContext.pluginConfig.featureAwesomeProps) {
        return;
    }
    body.classList.add('awUi-props');
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-awesomeProps-css', style: awesomePropsStyles });
    }, 500)
}

export const awesomePropsLoadUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-awesomeProps-css-${globalContext.pluginID}"]`)?.remove();
    body.classList.remove('awUi-props');
}