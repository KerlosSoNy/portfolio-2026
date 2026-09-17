import { useRouter } from "next/navigation";

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const usePageTransition = () => {
    const router = useRouter();

    return async (
        href: string,
    ) => {
        const body = document.querySelector(".animation-wrapper");
        body?.classList.add("page-transition");
        await sleep(500);
        router.push(href);
        await sleep(500);
        body?.classList.remove("page-transition");
    };

};