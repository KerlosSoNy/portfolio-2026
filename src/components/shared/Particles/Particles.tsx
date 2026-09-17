"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

import particlesConfig from "./particlesConfig";

const options = particlesConfig as ISourceOptions;

function ParticlesComponent() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-1 h-full w-full">
      <Particles id="tsparticles" options={options} />
    </div>
  );
}

export default ParticlesComponent;
