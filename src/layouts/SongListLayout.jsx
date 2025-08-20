import { Outlet } from "react-router";
import NowPlayingLayout from "./NowPlayingLayout";

export default function SongListLayout() {
    return (
        <NowPlayingLayout startClassName="flex-2/3 xl:flex-3/4" endClassName="hidden md:block flex-1/3 xl:flex-1/4">
            <Outlet />
        </NowPlayingLayout>
    );
}