import { useContext, useEffect, useState } from "react";
import { Image } from "./AlbumArt";
import PictureWithInfo from "./PictureWithInfo";
import { GlobalContext } from "../main";
import { useShow } from "../hooks/Show";
import { RadioIcon } from "@heroicons/react/24/solid";
import { HostImage, HostsContainer } from "./Host.components";
import { ProgramTags } from "./ProgramTags";

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
                        <div className="show-text-wrapper flex flex-col flex-grow text gap-2">
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
                    <div className="program-tags flex justify-evenly">
                        <ProgramTags programTags={finalShow.program_tags}  />
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

export default CurrentShowMini;