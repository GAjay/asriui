import type { MotionPresetName } from "../src/motion/presetPacks";

export function buildInstallSnippet(preset: MotionPresetName) {
  const config = '{ theme: "light", motion: "' + preset + '" }';
  return (
    "pnpm add axiom-ui framer-motion\n\n" +
    'import { AxiomProvider } from "axiom-ui/config";\n' +
    'import { Button } from "axiom-ui";\n' +
    'import "axiom-ui/style.css";\n\n' +
    "<AxiomProvider config=" +
    config +
    ">\n" +
    "  <Button>Get Started</Button>\n" +
    "</AxiomProvider>"
  );
}
