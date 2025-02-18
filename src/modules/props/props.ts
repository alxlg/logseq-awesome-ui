import {
    globalContext,
    doc,
    propsChangedObserverInit, propsChangedObserverRun, propsChangedObserverStop
} from '../internal';

import './props.css';

export const hidePropsLoad = async () => {
    hideProps();
    propsChangedObserverInit();
    propsChangedObserverRun();
    // Route listener
    logseq.App.onRouteChanged(() => {
        propsChangedObserverStop();
        setTimeout(() => {
            hideProps();
            propsChangedObserverRun();
        }, 100);
    });
}

export const hidePropsUnload = () => {
    hideDotPropsUnload();
    hideSetOfPropsUnload();
}

export const toggleHideDotPropsFeature = () => {
    if (globalContext.pluginConfig.featureHideDotProps) {
        hideProps();
    } else {
        hideDotPropsUnload();
    }
}

export const toggleHideSetOfPropsFeature = () => {
    if (globalContext.pluginConfig.featureHideSetOfProps) {
        hideProps();
    } else {
        hideSetOfPropsUnload();
    }
}

const hideDotPropsUnload = () => {
    const dotPropList = doc.querySelectorAll('.awUI-hideDotProp');
    if (dotPropList.length) {
        for (let i = 0; i < dotPropList.length; i++) {
            const dotProp = dotPropList[i];
            dotProp.classList.remove('hidden', 'awUI-hideDotProp');
        }
    }
}

const hideSetOfPropsUnload = () => {
    const setOfPropsList = doc.querySelectorAll('.awUI-hideSetOfProps');
    if (setOfPropsList.length) {
        for (let i = 0; i < setOfPropsList.length; i++) {
            const setOfPropsItem = setOfPropsList[i];
            setOfPropsItem.classList.remove('hidden', 'awUI-hideSetOfProps');
        }
    }
}

export const hideProps = async () => {
    if (!globalContext.pluginConfig.featureHideDotProps && !globalContext.pluginConfig.featureHideSetOfProps) {
        return;
    }
    let hidePropsArr: string[] = [];
    if (globalContext.pluginConfig.featureHideSetOfProps) {
        hidePropsArr = (globalContext.pluginConfig.featureHideSetOfProps as string).trim().toLowerCase().replaceAll(', ', ',').split(',');
    }
    const propKeyList = doc.querySelectorAll('.page-properties .page-property-key');
    if (propKeyList.length) {
        for (let i = 0; i < propKeyList.length; i++) {
            const propKeyItem = propKeyList[i].textContent;
            const propItem = propKeyList[i].parentElement!.parentElement;
            if (propKeyItem && propItem) {
                if (globalContext.pluginConfig.featureHideDotProps && propKeyItem?.startsWith('.')) {
                    propItem.classList.add('hidden', 'awUI-hideDotProp');
                } else if (globalContext.pluginConfig.featureHideSetOfProps && hidePropsArr.includes(propKeyItem)) {
                    propItem.classList.add('hidden', 'awUI-hideSetOfProps');
                } else {
                    propItem.classList.remove('hidden', 'awUI-hideSetOfProps');
                }
            }
        }
    }
}
