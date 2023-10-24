import React from "react";
import { createRoot } from "react-dom/client";


export function createDomTreeMounter(defaultMountNode){

    const confirms = {};
    const callbacks = {};


    //div wrapper를 만든 후에, 주어진 컴포넌트를 그곳에 자식으로 추가함으로서 렌더링
    function mount(Component, props, mountNode){
        const key = Math.floor(Math.random() * (1 << 30)).toString(16);
        const wrapper = (mountNode || defaultMountNode || document.body).appendChild(document.createElement('div'));
        confirms[key] = wrapper;

        const root = createRoot(wrapper);
        
        root.render(
            <Component
              {...props}
            />
          );
        callbacks.mounted && callbacks.mounted();
        return key;
    }

    function unmount(key) {
        const wrapper = confirms[key];
        delete confirms[key];
        
        if (wrapper && wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
        }
    }

    return {
        mount, unmount, options: {}
    }

}