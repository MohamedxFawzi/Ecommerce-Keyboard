import SceneProps from "@/types/ColorChangeSceneProps";
import { Keyboard, KeyboardRefs } from "@/components/Keyboards";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

export function Scene({ selectedTextureId, onAnimationComplete }: SceneProps) {
  const keyboardRef = useRef<KeyboardRefs>(null);
  const texturePaths = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, SetCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    // Return early if no ref or if the texture is already the current one
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const kb = keyboardRef.current;
      if (!kb || !kb.container.current) return;

      const switchGroups = Object.values(kb.switches)
        .map((ref) => ref?.current)
        .filter(Boolean);

      const keycapGroups = Object.values(kb.keycaps)
        .map((ref) => ref?.current)
        .filter(Boolean);

      const switchPositions = switchGroups.map((group) => group!.position);
      const keycapPositions = keycapGroups.map((group) => group!.position);

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete();
        },
      });

      // 1. VANISH PHASE: Premium "Pop & Shrink" effect
      // Using 'back.in(1.5)' makes it slightly scale up before quickly vanishing, looking much more intentional and polished.
      tl.to(kb.container.current.scale, {
        x: 0.001,
        y: 0.001,
        z: 0.001,
        duration: 0.3, // Slightly longer so the eye catches the smooth shrink
        ease: "back.in(1.5)",
        onComplete: () => {
          SetCurrentTextureId(selectedTextureId);
        },
      });

      // 2. SETUP PHASE
      tl.set(kb.container.current.position, { y: "+=1.5" })
        .set(switchPositions, { y: "+=1.5" })
        .set(keycapPositions, { y: "+=3.0" })
        .set(kb.container.current.scale, { x: 1, y: 1, z: 1 }); // Restore scale

      // 3. ASSEMBLE PHASE: Smooth mechanical landing
      tl.to(
        kb.container.current.position,
        {
          y: "-=1.5",
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.1",
      )

        .to(
          switchPositions,
          {
            y: "-=1.5",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.35",
        )

        .to(
          keycapPositions,
          {
            y: "-=3.0",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.35",
        );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      SetCurrentTextureId(selectedTextureId);
      onAnimationComplete();
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};
    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;
      if (texture) {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });
    return materialMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (t) => t.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={"city"} intensity={0.002} shadows="contact">
      <Keyboard
        ref={keyboardRef}
        keycapMaterial={materials[currentTextureId]}
        knobColor={currentKnobColor}
        position={[0.2, -0.5, 1.9]}
        rotation={[0.5, 0, 0]}
        castShadow
      />
    </Stage>
  );
}
