import type { MotionPresetName } from "../src/motion/presetPacks";

export function buildInstallSnippet(preset: MotionPresetName) {
  const config = '{ theme: "light", motion: "' + preset + '" }';
  return (
    "pnpm add asriui framer-motion\n\n" +
    'import { AsriUIProvider } from "asriui/config";\n' +
    'import { Button } from "asriui";\n' +
    'import "asriui/style.css";\n\n' +
    "<AsriUIProvider config=" +
    config +
    ">\n" +
    "  <Button>Get Started</Button>\n" +
    "</AsriUIProvider>"
  );
}
