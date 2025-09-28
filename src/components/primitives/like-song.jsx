import useIsLiked from "@/hooks/IsLiked";
import { cn } from "@/lib/utils";
import useLikedSongsStore from "@/store/useLikedSongsStore";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

export default function LikeSongButton({ song, asChild = false, ...props }) {
    const toggleSong = useLikedSongsStore(store => store.toggleSong);
    const liked = useIsLiked(song); 
    const Comp = asChild ? Slot : DefaultButton;

    return <Comp onClick={() => toggleSong(song)} 
                 disabled={song.play_type !== 'trackplay'}
                 data-disabled={song.play_type !== 'trackplay'}
                 data-liked={liked}
                 {...props} 
                 className={cn(`
                    cursor-pointer group/likeButton 
                    disabled:pointer-events-none 
                    data-[disabled=true]:pointer-events-none`, 
                    props.className
                )} 
            />;
}

function DefaultButton({ ...props }) {
    return (
        <Button variant="ghost" size="icon" {...props} 
            className={
                cn(
                    "group/likeButton", 
                    "*:min-w-full *:min-h-full",
                    "*:color-white *:hidden",
                    props.className,
                )
            }
        >
            <HeartIcon className="group-data-[liked=true]/likeButton:flex" />
            <HeartOutlineIcon className="group-data-[liked=false]/likeButton:flex" />
        </Button>
    );
}