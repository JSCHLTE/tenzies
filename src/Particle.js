import { fireworks } from "tsparticles-fireworks";

export default function Particle() {
    (async () => {
        await fireworks();
      })();

      fireworks({
        colors: ["#FF10F0", "#1B03A3", "#39FF14", "#FF3131", "#FFF", "#BC13FE", "#FF5F1F"],
        sounds: "false",
        splitCount: 50,
      });

    return (<></>);
};