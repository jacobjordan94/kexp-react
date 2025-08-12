import { useContext } from "react";
import AlbumArt, { Image } from "./AlbumArt";
import PictureWithInfo from "./PictureWithInfo";
import { GlobalContext } from "../main";

function CurrentShowMini({}) {
    
    const { globalState: { currentShow } } = useContext(GlobalContext);
    
    return ( currentShow &&
        <PictureWithInfo
            image={currentShow.program_image_uri} 
            title={currentShow.program_name}
            subtitle={ currentShow.host_names.join(', ') }
        >
            <HostImage image={ currentShow.image_uri }  />
        </PictureWithInfo>
    )
}

function HostImage({ size = 'size-12' , image }) {
    return  <Image image={image} className={"show-host-wrapper overflow-hidden rounded-full " + size}>
                <div className="backdrop-blur-md p-1 w-full h-full">
                    <Image image={image} className="show-host-image w-full h-full overflow-hidden rounded-full" />
                </div>
            </Image>
}

export default CurrentShowMini;