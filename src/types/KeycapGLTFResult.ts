import * as THREE from "three";
import { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    Keycap: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

type KeycapProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  texture?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ;
};

export type { GLTFResult, KeycapProps };
