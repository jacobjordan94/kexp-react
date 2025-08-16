export default function CommentBox({comment = '', className}) {
    return ( comment &&
        <div className={"song-comment-box light-alpha-1 p-4 rounded-2xl border-4 transparent-border-light before:content-['\"'] " + className}>
            <span className="inline-flex items-center justify-center text-4xl font-serif font-bold italic me-4">"</span>
            <span className="italic font-light text-lg">
                { comment }
            </span>
        </div>
    );
}