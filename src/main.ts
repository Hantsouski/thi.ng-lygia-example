import "./style.css";

import { assign, vec4, vec2 } from "@thi.ng/shader-ast";
import { fragUV } from "@thi.ng/shader-ast-stdlib";

import {
  glCanvas,
  compileModel,
  draw,
  defQuadModel,
  FX_SHADER_SPEC,
  defShader,
  ShaderFn,
} from "@thi.ng/webgl";

import { defMain } from "@thi.ng/shader-ast/ast/function";

const W = window.innerWidth * 0.6;
const H = window.innerHeight * 0.6;

const { canvas, gl } = glCanvas({
  width: W,
  height: H,
  version: 1,
  parent: document.getElementById("app")!,
});

export const PASSTHROUGH_FS: ShaderFn = (gl, _, __, outs) => [
  defMain(() => [
    assign(
      outs.fragColor,
      vec4(fragUV(gl.gl_FragCoord, vec2(canvas.width, canvas.height)), 1, 1)
    ),
  ]),
];

const model = {
  ...defQuadModel({ uv: false }),
  shader: defShader(gl, { ...FX_SHADER_SPEC, fs: PASSTHROUGH_FS }),
};

compileModel(gl, model);
console.log(model);

draw(model);
