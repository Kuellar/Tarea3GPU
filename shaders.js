// Vertex shader program
export const vsSource = `
void main() {
    gl_Position = vec4( position, 1.0 );
}
`;

// Fragment shader program
export const fsSource = `
// BASE
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// PLAYGROUND
uniform float u_grill;
uniform bool u_grill_active;
uniform bool u_point_active;
uniform float u_point_size;
uniform float u_point_r;
uniform float u_point_g;
uniform float u_point_b;
uniform float u_point_a;
uniform float u_point_gradient;
uniform bool u_point_additive;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= u_grill;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 10.;  // minimum distance
    vec2 m_point;        // minimum point

    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin(u_time + 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);

            if( dist < m_dist ) {
                m_dist = dist;
                m_point = point;
            }
        }
    }

    // Assign a color using the closest point position
    color += dot(m_point,vec2(.3,.6));

    // Add distance field to closest point center
    //color.r = m_dist;
    //color.g = m_dist;
    //color.b = m_dist;

    // Show isolines
    // color -= abs(sin(40.0*m_dist))*0.07;

    // Draw cell center
    highp int is_center = int(step(m_dist, u_point_size/100.));
    if (u_point_active && bool(is_center)) {
        if (u_point_additive){
            color.r += u_point_r*u_point_a*(1.-m_dist*u_point_gradient);
            color.g += u_point_g*u_point_a*(1.-m_dist*u_point_gradient);
            color.b += u_point_b*u_point_a*(1.-m_dist*u_point_gradient);
        } else {
            color.r = u_point_r*u_point_a*(1.-m_dist*u_point_gradient);
            color.g = u_point_g*u_point_a*(1.-m_dist*u_point_gradient);
            color.b = u_point_b*u_point_a*(1.-m_dist*u_point_gradient);
        }
    }

    // Draw grid
    if (u_grill_active) {
        color.r += step(.98, f_st.x) + step(.98, f_st.y);
    }

    gl_FragColor = vec4(color,1.0);
}
`;
