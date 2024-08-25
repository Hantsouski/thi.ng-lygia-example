import "./style.css";

import {
  compileModel,
  defQuadModel,
  defShader,
  draw,
  FX_SHADER_SPEC,
  glCanvas,
} from "@thi.ng/webgl";
import { meldDeepObj } from "@thi.ng/object-utils";
import { fromDOMEvent, fromRAF, merge, sync, reactive } from "@thi.ng/rstream";

import fragmentShader from "./shaders/fragment-shader.frag";

const W = 640;
const H = 640;

const { canvas, gl } = glCanvas({
  width: W,
  height: H,
  version: 2,
  parent: document.getElementById("app")!,
});

const model = {
  ...defQuadModel({ uv: false }),
  shader: defShader(
    gl,
    meldDeepObj(FX_SHADER_SPEC, {
      fs: fragmentShader,
      uniforms: {
        u_resolution: ["vec2", [W * 2, H * 2]],
        u_mouse: ["vec2", [0, 0]],
        u_time: ["float", 0],
      },
    }),
  ),
};

compileModel(gl, model);

sync({
  src: {
    time: fromRAF(),
    mouse: merge({
      src: [
        reactive([0, 0]),
        fromDOMEvent(canvas, "mousemove").map(({ offsetX, offsetY }) => [
          offsetX / W,
          1 - offsetY / H,
        ]),
      ],
    }),
  },
}).subscribe({
  next: ({ mouse, time }) => {
    model.uniforms!.u_mouse = mouse;
    model.uniforms!.u_time = time * 0.005;

    draw(model);
  },
});
