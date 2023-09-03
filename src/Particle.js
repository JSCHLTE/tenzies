import { fireworks } from "tsparticles-fireworks";

export default function Particle() {
    (async () => {
        await fireworks();
      })();

      fireworks({
        colors: ["#ffffff", "#ff0000", "#00ffff"],
        duration: 10,
        sounds: "false",
        splitCount: 50,
      });

    return (<></>);
};