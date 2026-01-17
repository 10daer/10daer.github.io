import { MenuBar } from "../components";
import { IAnimRoute } from "../components/types";

export default function AboutPage({ isActive, setNavIsActive }: IAnimRoute) {
    return (
        <section>
            <MenuBar isActive={isActive} setNavIsActive={setNavIsActive} />

        </section>
    )
}
