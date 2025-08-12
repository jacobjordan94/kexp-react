import { useContext } from "react";
import AlbumArt from "./AlbumArt";
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
            <div className={"show-host-image size-12 overflow-hidden rounded-full"}>
                <AlbumArt className="show-host-image size-12 overflow-hidden rounded-full" image={ currentShow.image_uri } />
            </div>
        </PictureWithInfo>
    )
}

export default CurrentShowMini;