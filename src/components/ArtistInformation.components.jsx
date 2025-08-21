import { UserIcon, CodeBracketIcon, MusicalNoteIcon  } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import BaseLikeButton from "./BaseLikeButton";

export const AlbumIcon = ({ className }) => <CodeBracketIcon className={className} />
export const ArtistIcon = ({ className }) => <UserIcon className={className} />
export const SongIcon = ({ className }) => <MusicalNoteIcon className={className} />

export function IconText({Icon, text, iconClass, textClass}) {
    return ( text && 
        <div className={"icon-text flex gap-2.5 items-center"}>
            <div className={"icon " + iconClass}>
                <Icon />
            </div>
            <div className={"text " + textClass}>{ text }</div>
        </div>
    );
}

export function ArtistInformation({ artistName, iconClass, textClass }) {
    return <IconText Icon={() => <ArtistIcon className={iconClass} />} text={artistName} iconClass={iconClass} textClass={textClass} />
}

export function AlbumInformation({ albumName, iconClass, textClass }) {
    return <IconText Icon={() => <AlbumIcon className={iconClass} />} text={albumName} iconClass={iconClass} textClass={textClass} />
}

export function SongInformation({ songName, iconClass, textClass }) {
    return <IconText Icon={() => <SongIcon className={iconClass}/>} text={songName} iconClass={iconClass} textClass={textClass} />
}

export function FullArtistInfo({ song, sections = ['artist', 'song', 'album'], artistIconClass, artistTextClass, songIconClass, songTextClass, albumIconClass, albumTextClass, iconClass, textClass, children, className }) {
    const [info, setInfo] = useState();
    useEffect(() => {
        if(!song) return;
        if(song.play_type === 'trackplay') setInfo(song);
        else if(song.play_type === 'airbreak') {
            setInfo({ artist: 'KEXP', song: 'Airbreak', album: '' });
        }

    }, [ song ]);

    return ( info &&
        <div className={"full-artist-info " + className}>
            <div className="full-artist-info-inner flex items-center gap-4">
                <div className="full-artist-info-text flex-grow flex flex-col gap-1.5">
                {
                    sections.map((section, i) => (
                        section === 'artist' ? <ArtistInformation key={i} artistName={info.artist} iconClass={iconClass + " " + artistIconClass} textClass={textClass + " " + artistTextClass} /> :
                        section === 'song'   ? <SongInformation   key={i} songName={info.song}     iconClass={iconClass + " " + songIconClass}   textClass={textClass + " " + songTextClass}   /> : 
                        section === 'album'  ? info.album && <AlbumInformation  key={i} albumName={info.album}   iconClass={iconClass + " " + albumIconClass}  textClass={textClass + " " + albumTextClass}  /> : <></>
                    ))
                }
                </div>
                { children }
            </div>
        </div>
    );
}

export function FullArtistInfoWithLikeButton({ song, sections = ['artist', 'song', 'album'], artistIconClass, artistTextClass, songIconClass, songTextClass, albumIconClass, albumTextClass, iconClass, textClass, className, likeButtonSize = 'size-10' }) {
    return ( 
        <FullArtistInfo
            song={song} sections={sections} artistIconClass={artistIconClass} 
            artistTextClass={artistTextClass} songIconClass={songIconClass} 
            songTextClass={songTextClass} albumIconClass={albumIconClass} 
            albumTextClass={albumTextClass} iconClass={iconClass} textClass={textClass}
            className={className}
        >
            <BaseLikeButton className={"me-4 " + likeButtonSize} currentSong={song} />
        </FullArtistInfo>
    );
}

