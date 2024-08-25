#include "../../lygia/space/fisheye2xyz.glsl"
#include "../../lygia/lighting/atmosphere.glsl"

void main() {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy / u_resolution;

    vec2 mouse = u_mouse;

    if (mouse.x <= 0.0 && mouse.y <= 0.0)
        mouse = vec2(fract(0.5 + u_time * 0.5), 0.6);

    vec3 eye_dir = fisheye2xyz(st);
    vec3 sun_dir = fisheye2xyz(mouse);

    color = atmosphere(eye_dir, sun_dir);

    fragColor = vec4(color, 1.0);
}
