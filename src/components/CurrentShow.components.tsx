import { useContext, useEffect, useState } from "react";
import { Image } from "./AlbumArt";
import PictureWithInfo from "./PictureWithInfo";
import { GlobalContext } from "../main";
import { useShow } from "../hooks/Show";

export function Show({ show, id = null, className = '' }) {
    const [ finalShow, setFinalShow ] = useState();
    const [ showFromId, getShow ] = useShow();

    useEffect(() => {
        if(show) setFinalShow(show);
        else if(showFromId) setFinalShow(showFromId);
    }, [ show, showFromId ]);

    useEffect(() => {
        if(!id) return;
        getShow(id);
    }, [ id ]);

    return ( finalShow &&
        <div className={"current-show p-2 " + className}>
            <div className="show-info flex items-end gap-4">
                {/* <div className="show-art-wrapper">
                    <Image image={finalShow.program_image_uri} className="size-20 rounded-2xl overflow-hidden" />
                </div> */}
                <div className="show-text-wrapper flex flex-col text gap-2">
                    <div className="program-name text-2xl font-semibold">{ finalShow.program_name }</div>
                    <div className="tagline">{ finalShow.tagline }</div>
                </div>
            </div>
            <div className="hosts">
    
            </div>
        </div>
    );
}

export function CurrentShow() {
    const { globalState: { currentShow } } = useContext(GlobalContext);
    return currentShow && <Show show={currentShow} />
}

export function ShowMini({ show, size = 'size-12', titleClass = '', subtitleClass = 'text-xs' }) {
    
    return ( show &&
        <PictureWithInfo
            image={show.program_image_uri} 
            imageSize={size}
            title={show.program_name}
            titleClass={titleClass}
            subtitleClass={subtitleClass}
            subtitle={ show.host_names.join(', ') }
        >
            <HostImage size={size} image={ show.image_uri }  />
        </PictureWithInfo>
    )
}

function CurrentShowMini({ size = 'size-12', titleClass = '', subtitleClass = 'text-xs' }) {
    const { globalState: { currentShow } } = useContext(GlobalContext);
    return currentShow && <ShowMini show={currentShow} size={size} titleClass={titleClass} subtitleClass={subtitleClass} />
}

function HostImage({ size = 'size-12' , image }) {
    return  <Image image={image} className={"show-host-wrapper overflow-hidden rounded-full " + size}>
                <div className="backdrop-blur-md p-1 w-full h-full">
                    <Image image={image} className="show-host-image w-full h-full overflow-hidden rounded-full" />
                </div>
            </Image>
}

export default CurrentShowMini;