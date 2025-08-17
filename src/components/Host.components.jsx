import { Image } from "./AlbumArt";
import useHost from '../hooks/Host';
import { useEffect } from "react";

export function HostsContainer({ hosts }) {
    return  <div className="hosts-container flex flex-col gap-2">
                <div className="title text-xl font-semibold">{ hosts.length > 1 ? 'Hosts' : 'Host' }</div>
                <div className="flex flex-col gap-3 ps-2">{ 
                    hosts.map(id => 
                        <HostWithName key={'host-' + id} imageSize='size-12' textSize='text-lg' id={id} />
                )}</div>
            </div>
}

export function HostWithName({ id, imageSize, textSize }) {
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

export function HostImage({ size = 'size-12' , image }) {
    return  <Image image={image} className={"show-host-wrapper overflow-hidden rounded-full " + size}>
                <div className="backdrop-blur-md p-1 w-full h-full">
                    <Image image={image} className="show-host-image w-full h-full overflow-hidden rounded-full" />
                </div>
            </Image>
}