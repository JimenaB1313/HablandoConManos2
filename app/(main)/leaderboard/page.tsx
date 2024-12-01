import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Separator } from "@/components/ui/separator";
import { getProgresoUsuario, getTopDiezUsuarios } from "@/db/queries";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Misiones } from "@/components/misiones";

const LeaderboardPage = async () => {
    const progresoUsuarioData = getProgresoUsuario();
    const leaderboardData = getTopDiezUsuarios();

    const [
        progresoUsuario,
        leaderboard,
    ] = await Promise.all([
        progresoUsuarioData,
        leaderboardData,
    ]);

    if (!progresoUsuario || !progresoUsuario.activeCurso) {
        redirect("/cursos");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={progresoUsuario.activeCurso}
                    corazones={progresoUsuario.corazones}
                    puntos={progresoUsuario.puntos}
                />
                <Misiones puntos={progresoUsuario.puntos} />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/leaderboard.svg"
                        alt="leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Ve dónde te posicionas entre otros miembros aprendiendo a tu lado.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((progresoUsuario, index) => (
                        <div
                            key={progresoUsuario.usuarioId}
                            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                        >
                            <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                            <Avatar
                                className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                            >
                                <AvatarImage
                                    className="object-cover"
                                    src={progresoUsuario.userImageSrc}
                                />
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {progresoUsuario.nombreUsuario}
                            </p>
                            <p className="text-muted-foreground">
                                {progresoUsuario.puntos} EXP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;