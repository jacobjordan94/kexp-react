import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAudioStore from "@/store/useAudioStore";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

export default function PlayPauseButtonPrimitive({ asChild = false, ...props }) {
    const isPlaying = useAudioStore(store => store.isPlaying);
    const togglePlay = useAudioStore(store => store.togglePlay);
    const Comp = asChild ? Slot : DefaultButton;

    return (
        <Comp 
            onClick={() => togglePlay()}
            data-is-playing={isPlaying}
            { ...props }
            className={cn(
                "cursor-pointer group/playPauseButton",
                "data-[icon-size=large]:size-16",
                props.className
            )}
        />
    );
}

function DefaultButton({ ...props }) {
    return (
        <Button variant="ghost" size="icon" {...props}
            className={
                cn(
                    "group/playPauseButton",
                    "*:min-w-full *:min-h-full",
                    "*:color-white *:hidden",
                    props.className,
                )
            }
        >
            <PlayIcon  className="group-data-[is-playing=false]/playPauseButton:flex" />
            <PauseIcon className="group-data-[is-playing=true]/playPauseButton:flex"  />
        </Button>
    );
}