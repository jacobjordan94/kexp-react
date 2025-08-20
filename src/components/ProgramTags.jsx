import { useEffect, useState } from "react";

export function ProgramTags({ programTags }) {
    const [ tags, setTags ] = useState();
    useEffect(() => {
        if(!programTags) return;
        setTags(programTags.split(','));
    }, [ programTags ])

    return tags && tags.map((tag, i) => <ProgramTag key={i} tag={tag} />)
}

export function ProgramTag({ tag }) {
    return tag &&
        <div className="program-tag inline rounded-full px-3 py-1 backdrop-blur-sm border-1">
            <span className="inline-flex min-w-[48px] justify-center">{ tag }</span>
        </div>
}