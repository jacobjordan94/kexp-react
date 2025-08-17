import { useContext, useEffect, useState } from "react";
import { Image } from "./AlbumArt";
import PictureWithInfo from "./PictureWithInfo";
import { GlobalContext } from "../main";
import { useShow } from "../hooks/Show";
import useHost from "../hooks/Host";
import { RadioIcon } from "@heroicons/react/24/solid";

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
        <div className={"current-show rounded-2xl overflow-hidden border-2 transparent-border-dark " + className}>
            <Image image={finalShow.program_image_uri}>
                <div className="inner-content flex flex-col gap-4 p-4 backdrop-blur-xs dark-alpha-3">
                    <div className="show-info flex items-end gap-4">
                        <div className="show-text-wrapper flex flex-col text gap-2">
                            <div className="program-name-icon-wrapper text-2xl font-semibold flex">
                                <div className="program-name flex-grow">
                                    { finalShow.program_name }
                                </div>
                                <div className="icon-wrapper flex items-center">
                                    <RadioIcon className="size-6" />
                                </div>
                            </div>
                            <div className="tagline ps-2 font-semibold">{ finalShow.tagline }</div>
                        </div>
                    </div>
                    <HostsContainer hosts={finalShow.hosts} />
                </div>
            </Image>
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

function HostsContainer({ hosts }) {
    return  <div className="hosts-container flex flex-col gap-2">
                <div className="title text-xl font-semibold">{ hosts.length > 1 ? 'Hosts' : 'Host' }</div>
                <div className="flex flex-col gap-3 ps-2">{ 
                    hosts.map(id => 
                        <HostWithName key={'host-' + id} imageSize='size-14' textSize='text-lg' id={id} />
                )}</div>
            </div>
}

function HostWithName({ id, imageSize, textSize }) {
    const [ host, getHost ] = useHost();
    useEffect(() => {
        if(!id) return;
        getHost(id);
    }, [ id ]);

    return host &&
        <div className="host-with-name flex items-center gap-4">
            <HostImage image={host.thumbnail_uri} size={imageSize} />
            <span className={'font-semibold ' + textSize}>{ host.name }</span>
        </div>
}

function HostImage({ size = 'size-12' , image }) {
    return  <Image image={image} className={"show-host-wrapper overflow-hidden rounded-full " + size}>
                <div className="backdrop-blur-md p-1 w-full h-full">
                    <Image image={image} className="show-host-image w-full h-full overflow-hidden rounded-full" />
                </div>
            </Image>
}

export default CurrentShowMini;